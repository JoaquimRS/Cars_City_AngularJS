<?php
    class auth0 {
        public static function getCredentials() {
            return parse_ini_file(UTILS. "auth0.ini");
        }
    }
?>