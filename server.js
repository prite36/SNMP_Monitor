/* eslint-disable*/
var express = require('express')
var app = express()
var snmp = require('snmp-native')
var speedTest = require('speedtest-net')
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
var community = 'public'
// ///// set interval ////////




setRequestTime()
setInterval(function () {
  setRequestTime()
}, 5000)
// /////////////////////////
var vb = []
var oid1 = [1, 3, 6, 1, 2, 1, 1]

var r415 = new snmp.Session({ host: '10.41.160.1', community: community })
r415.getSubtree({ oid: oid1 }, function (err, varbinds) {
  vb.push({
    discription: varbinds[0].value,
    uptime: varbinds[2].value,
    name: varbinds[4].value
  })
  // console.log(vb[0].name)
  r415.close()
})

// ////////////////////////////next methord //////////////////////////////////////////////
var speed = []
// //////// speed ///////
function setRequestTime () {
  var test = speedTest({maxTime: 4000})
  test.on('data', function (data) {
    console.dir(data)
    speed.push(data)
  })
}
////////////r415////////////////////
///// variable ////////
var int_415 = []
var port_415 = []
var time_415 = []
var inOctet_415 = []
var outOctet_415 = []
var data415 = []
// ///// interface ////////
var getintR415 = new snmp.Session({ host: '10.4.15.1', community: community })
var oidget_int = '.1.3.6.1.2.1.2.2.1.2'
getintR415.getSubtree({ oid: oidget_int }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    int_415.push(data.value)
  })
  getintR415.close()
})
// /////// portstatus  ////////////
var getportR415 = new snmp.Session({ host: '10.4.15.1', community: community })
var oidget_port = '.1.3.6.1.2.1.2.2.1.8'
getportR415.getSubtree({ oid: oidget_port }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    // console.log(data.value)
      if (data.value == 1) {
         port_415.push("up")
      }
      else if (data.value == 2) {
        port_415.push("down")
      }
  })
  getportR415.close()
})

// .1.3.6.1.2.1.2.2.1.9
var gettimeR415 = new snmp.Session({ host: '10.4.15.1', community: community })
var oidget_time = '.1.3.6.1.2.1.2.2.1.9'
gettimeR415.getSubtree({ oid: oidget_time }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    // console.log(int_415)
    time_415.push(data.value)
  })
  gettimeR415.close()
})

// .1.3.6.1.2.1.2.2.1.10
var getInR415 = new snmp.Session({ host: '10.4.15.1', community: community })
var oidget_in = '.1.3.6.1.2.1.2.2.1.10'
getInR415.getSubtree({ oid: oidget_in }, function (err, varbinds) {
  varbinds.forEach(function (data) {

    inOctet_415.push(data.value)
  })
  getInR415.close()
})

// .1.3.6.1.2.1.2.2.1.16
var getOutR415 = new snmp.Session({ host: '10.4.15.1', community: community })
var oidget_out = '.1.3.6.1.2.1.2.2.1.16'
getOutR415.getSubtree({ oid: oidget_out }, function (err, varbinds) {
  varbinds.forEach(function (data) {

    outOctet_415.push(data.value)
  })
  getOutR415.close()
})


/////////////////////// api get source //////////////////////////////////////////
app.get('/name', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headres', 'X-Requested-With')
  res.send(vb)
})
app.get('/speed', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headres', 'X-Requested-With')
  res.send(speed)
})
app.get('/415', function (req, res) {
  int_415.forEach(function (err, index) {
    var set = {
      name: '415',
      int: int_415[index],
      port: port_415[index],
      time: time_415[index],
      inOctet: inOctet_415[index],
      outOctet: outOctet_415[index]
    }
    data415.push(set)
  })
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headres', 'X-Requested-With')
  res.send(data415)
})

// ////////////////server localhost /////////////////////////
app.use(express.static('dist'))
app.listen(7001, function () {
  console.log('Example app listening on port 7001!')
})
