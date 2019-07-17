const searcher = require('evenboy-ip2region').create();

exports.getIp = function (req, res, next) {
    searcher.binarySearch(tempIp, function (err, tempData) {
        if (err) {
            req.netInfo = netInfo;
            next();
        }
        if (tempData.region) {
            let temp = tempData.region.split('|');
            netInfo.country_nameCN = temp[0] == '0' ? '内网' : temp[0]; //国家
            netInfo.mostSpecificSubdivision_nameCN = temp[2] == '0' ? '内网' : temp[2]; //省
            netInfo.city_nameCN = temp[3] == '0' ? '内网' : temp[3]; //市
            netInfo.isp = temp[4] == '0' ? '内网' : temp[4]; //isp
            netInfo.organizationCN = temp[4] == '0' ? '内网' : temp[4]; //isp
            netInfo.onlineip = tempIp; //ip
            if (netInfo.mostSpecificSubdivision_nameCN == "澳门") {
                netInfo.mostSpecificSubdivision_nameCN = "澳门特别行政区";
            } else if (netInfo.mostSpecificSubdivision_nameCN == "香港") {
                netInfo.mostSpecificSubdivision_nameCN = "香港特别行政区";
            } else if (netInfo.mostSpecificSubdivision_nameCN == "台湾") {
                netInfo.mostSpecificSubdivision_nameCN = "台湾省";
            } else if (netInfo.mostSpecificSubdivision_nameCN) {
                provinceData.forEach(function (val) {
                    if (val.indexOf(netInfo.mostSpecificSubdivision_nameCN) != -1) {
                        netInfo.mostSpecificSubdivision_nameCN = val;
                    }
                })
            }
        }
        req.netInfo = netInfo;
        next();
    });
};