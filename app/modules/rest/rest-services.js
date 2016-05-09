'use strict';

angular.module('rest',['base64'])

    .factory('RestService', ['$http', '$q', function ($http, $q) {
        var service = {};
        service.interfaces = {};
        var hasBody = ["registerStudentToFeedbacks" , "deleteLecture", "prepareFeedbacks", "writeLiveFeedback",
            "writePostFeedback", "createAdHocQuestion", "answerAdHocQuestion", "statusLecture"];


        /**
         *  Die nachfolgenden Calls werden zur Anmeldung bzw. Authentifizierung der Smart-Classroom App verwendet.
         * @type {{method: string, path: string}}
         */
        service.interfaces["validatePassword"] = {method: "GET", path: "/credential/validate"};
        service.interfaces["registerStudentToFeedbacks"] = {method: "POST", path: "/feedback/lecture/student/"};


        /**
         *  Feedbacks während der Vorlesung wie z.B. dass der Dozen lauter oder leiser spicht.
         *  können mit diesem Call gesendet werden.
         * @type {{method: string, path: string}}
         */
        service.interfaces["writeLiveFeedback"] = {method: "POST", path: "/feedback/feedbackmsg/live/"};
        service.interfaces["readLiveFeedback"] = {method: "GET", path: "/feedback/instruction/"};


        /**
         *  Diese Calls werden dazu verwendet Ad-Hoc Fragen des Dozenten zu Beantworten.
         * @type {{method: string, path: string}}
         */
        service.interfaces["isAdHocQuestionAlive"] = {method: "GET", path: "/feedback/ahq/question/"};
        service.interfaces["answerAdHocQuestion"] = {method: "POST", path: "/feedback/ahq/answer/"};


        /**
         *  Calls mit denen die Vorlesung bewertet werden kann.
         * @type {{method: string, path: string}}
         */
        service.interfaces["statusLecture"] = {method: "GET", path: "/feedback/lecture/status/"}
        service.interfaces["writePostFeedback"] = {method: "POST", path: "/feedback/feedbackmsg/post/"};
        service.interfaces["getPostFeedback"] = {method: "GET", path: "/feedback/feedbackmsg/post/"};


        /**
         *  Diese Calls werden ausschließlich vom Dozenten benutzt und sind hier nur Implementiert
         *  um die anderen Calls zu Testen.
         * @type {{method: string, path: string}}
         */
        service.interfaces["createAdHocQuestion"] = {method: "POST", path: "/feedback/ahq/question/"};
        service.interfaces["deleteAdHocQuestion"] = {method: "GET", path: "/feedback/ahq/question/"};
        service.interfaces["prepareFeedbacks"] = {method: "POST", path: "/feedback/lecture/"};
        service.interfaces["endPostFeedback"] = {method: "DELETE", path: "/feedback/feedbackmsg/post/"};
        service.interfaces["endLiveFeedback"] = {method: "DELETE", path: "/feedback/lecture/live/"};
        service.interfaces["deleteLecture"] = {method: "DELETE", path: "/feedback/lecture/"};

        /**
         *  Allgmeiner Restaufruf.
         *
         * @param key Schlüssel des Restaufrufs.
         * @param opts config object von angular (https://docs.angularjs.org/api/ng/service/$http#usage)
         * @returns Promise
         */
        service.call = function (key, opts) {
            //falls es kein config objekt gibt, wird eins erstellt.
            if (typeof opts === "undefined") {
                opts = {};
            }
            var parameter = (typeof opts.parameter === "undefined") ? "" : opts.parameter;
            var data = (typeof opts.data === "undefined") ? "" : opts.data;
            var request = service.interfaces[key];

            if (hasBody.indexOf(key) !== -1) {
                opts.method = request.method;
                opts.url = 'https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST' + request.path + opts.param;
                opts.data = data;
            } else {
                var url = 'https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST' + request.path;
                opts.method = request.method;
                opts.url = url + parameter;
            }

            var deferred = $q.defer();
            $http(opts).then(
                function (success) {
                    deferred.$$resolve(success);
                }, function (error) {
                    deferred.$$reject(error);
                });
            return deferred.promise;
        };

        return {
            call: function (key, opts) {
                return service.call(key, opts);
            },
            getURL: function (key) {
                return 'https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST' + service.interfaces[key].path;
            }
        }
    }]);

function getCurrentDate() {
    return new Date().toISOString().replace("T", " ").replace("Z" , "");
}

