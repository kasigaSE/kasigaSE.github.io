// Kasiga Market score store (Google Apps Script)
// Change the admin ID and password below.
var ADMIN_ID = 'kasiga-host';
var ADMIN_PASSWORD = 'Kasiga@2026';

function out(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function isAdmin(p){ return p.user === ADMIN_ID && p.key === ADMIN_PASSWORD; }

function doGet(e){
  var p = e.parameter || {};
  if (p.a === 'list') {
    if (!isAdmin(p)) return out({ok:false, error:'auth'});
    var all = PropertiesService.getScriptProperties().getProperties(), rows = [];
    for (var k in all) if (k.indexOf('p_') === 0) { try { var r = JSON.parse(all[k]); r.id = k.slice(2); rows.push(r); } catch(x){} }
    return out({ok:true, rows:rows});
  }
  return out({ok:true});
}

function doPost(e){
  var p = e.parameter || {};
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    var props = PropertiesService.getScriptProperties();
    if (p.a === 'clear') {
      if (!isAdmin(p)) return out({ok:false, error:'auth'});
      var all = props.getProperties();
      for (var k in all) if (k.indexOf('p_') === 0) props.deleteProperty(k);
      return out({ok:true});
    }
    if (p.a === 'put') {
      var inp = JSON.parse(e.postData.contents), d = inp.d || {};
      var id = String(inp.id || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40);
      if (!id) return out({ok:false});
      var pos = [], src = (d.pos || []).slice(0, 20);
      for (var i = 0; i < src.length; i++) pos.push({s:String(src[i].s || '').slice(0, 20), q:+src[i].q || 0, a:+src[i].a || 0});
      var row = {
        name:String(d.name || 'Player').slice(0, 30), nw:+d.nw || 0, ret:+d.ret || 0, pct:+d.pct || 0,
        realized:+d.realized || 0, cash:+d.cash || 0, trades:+d.trades || 0, hold:+d.hold || 0,
        state:d.state === 'finished' ? 'finished' : 'playing', run:!!d.run, tLeft:+d.tLeft || 0,
        updated:Date.now(), pos:pos
      };
      props.setProperty('p_' + id, JSON.stringify(row));
      return out({ok:true});
    }
    return out({ok:false});
  } finally { lock.releaseLock(); }
}
