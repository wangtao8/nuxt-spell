function flter (obj, pd) {
  let chid = document.getElementById(obj).children
  let chids = []
  for (var i = 0; i < chid.length; i++) {
    if (i !== chid.length - 1) {
      chids.push(chid[i])
    }
  }
  for (var x = 0; x < chids.length; x++) {
    if (pd) {
      chids[x].style.filter = 'blur(15px)'
    } else {
      chids[x].style.filter = 'blur(0px)'
    }
  }
}
export default {
  flter
}
