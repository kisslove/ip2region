var express = require('express');
var router = express.Router();
const searcher = require('evenboy-ip2region').create();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//查询IP
router.get('/lookUpIp', function (req, res, next) {
  if(!req.query.ip){
    res.json({
      success:false,
      msg:'IP不存在',
      data:null
    });
    return;
  }
  searcher.binarySearch(req.query.ip, function (err, tempData) {
    if (err) {
      res.json({
        success:false,
        msg:'解析错误',
        data:null
      });
      return;
    }
    console.log(tempData);
    let data=tempData.region.split("|");
    res.json({
        success:true,
        msg:'解析成功',
        data:{
          ip:req.query.ip,
          country:data[0],
          province:data[2],
          city:data[3],
          isp:data[4]
        }
    })
    
  });
});


//根据访问者IP返回区域
router.get('/getIp', function (req, res, next) {
  if(req.ip=="::1"){
    res.json({
      success:true,
      msg:'解析成功',
      data:{
        ip:'::1',
        country:0,
        province:0,
        city:0,
        isp:'本地IP'
      }
  });
  return;
  }
  searcher.binarySearch(req.ip, function (err, tempData) {
    if (err) {
      res.json({
        success:false,
        msg:'解析错误',
        data:null
      });
      return;
    }
    let data=tempData.region.split("|");
    res.json({
        success:true,
        msg:'解析成功',
        data:{
          ip:req.query.ip,
          country:data[0],
          province:data[2],
          city:data[3],
          isp:data[4]
        }
    })
  });
});

module.exports = router;
