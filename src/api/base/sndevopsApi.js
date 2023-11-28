
const axios = require('axios');
const url = require('node:url');
require('dotenv').config();
const BaseEnv = require('../../common/baseEnv')

class SndevopsApi {

    constructor(url = null, token = null, toolId = null) {
        this.url = url ? url : BaseEnv.SNOW_URL ;
        this.token = token ? token  : BaseEnv.SNOW_TOKEN ;
        this.toolId = toolId ? toolId : BaseEnv.SNOW_TOOLID;
        console.log("ServiceNow Url set to " + this.url + " tool id: " + this.toolId)
        this.validateMandatoryParams(this.url, this.token, this.toolId);
    }

    validateMandatoryParams(url, token, toolId) {
        var errorMessage;
        if(!url) errorMessage = "SNOW_URL is a required field.";
        if(!token) errorMessage += "SNOW_TOKEN is a required field.";
        if(!toolId) errorMessage += "SNOW_TOOLID is a required field.";

        if(errorMessage) {
            errorMessage += " Verify that the GitLab project level variables are configured.";
            console.error('\n \x1b[1m\x1b[31m' + errorMessage + '\x1b[0m\x1b[0m');
            process.exit(1);
        }
    }

    setNowUrl(url) {
        this.setNowUrl = url;
        return this;
    }

    setToken(token) {
        this.token = token;
        return token;
    }


    setToolId(toolId) {
        this.toolId = toolId;
        return this;
    }

    post(url, body, httpHeaders) {
        return this._postMethod(url, body ,  httpHeaders);
    }

    _getAuthHeaderWithToken(){
        return {
            "Authorization": "sn_devops.DevOpsToken " + this.toolId + ":" + this.token,
            "Content-Type": "application/json"
        }
    }


      _postMethod(url, body, httpHeaders) {

          axios.post(url,
            JSON.stringify(body),
            {headers:httpHeaders})
            .then(function (response) {
                console.log("Response of requet: " + new URL(url).pathname + " --->"  +JSON.stringify(response.data))
                return Promise.resolve(response)
            })
            .catch(function (error) {
                console.log(error);
                return Promise.reject;
            });;
    }


}

module.exports = SndevopsApi