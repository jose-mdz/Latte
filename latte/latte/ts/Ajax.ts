/**
 * Created by josemanuel on 5/4/15.
 */
module latte {

    /**
     *
     */
    export class Ajax {

        //region Static

        /**
         * Loads an URL
         * @param url
         * @param success
         * @param error
         */
        static get(url: string, success: (string) => void = null, error: (string) => void = null) {
            var xmlhttp: XMLHttpRequest;

            if (window['XMLHttpRequest']) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState == 4 ) {
                    if(xmlhttp.status == 200){
                        if(_isFunction(success))success(xmlhttp.responseText);
                    }else {
                        if(_isFunction(error)) error(sprintf("Error %s: %s", xmlhttp.status, url))
                    }
                }
            }

            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }

        /**
         * Loads an URL
         *
         * @param url
         * @param data
         * @param success
         * @param error
         */
        static post(url: string, data: any, success: (string) => void = null, error: (string) => void = null) {

            var req: XMLHttpRequest;
            var params: string[] = [];
            var query: string = null;

            if (window['XMLHttpRequest']) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                req = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                req = new ActiveXObject("Microsoft.XMLHTTP");
            }

            req.onreadystatechange = () => {
                if (req.readyState == 4 ) {
                    if(req.status == 200){
                        if(_isFunction(success))  success(req.responseText);
                    }else {
                        if(_isFunction(error)) error(sprintf("Error %s: %s", req.status, url))
                    }
                }
            }

            var fdata = new FormData();


            //Prepare params
            for(var i in data){
                fdata.append(i, data[i]);
            }

            req.open("POST", url);
            try{
                req.send(fdata);
            }catch(e){}

        }

        //endregion

    }

}