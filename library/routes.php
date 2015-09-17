<?php

function stripSlashesDeep($value) {
  $value = is_array($value) ? array_map('stripSlashesDeep', $value) : stripslashes($value);
  return $value;
}

function removeMagicQuotes() {
  if (get_magic_quotes_gpc()) {
    $_GET = stripSlashesDeep($_GET);
    $_POST = stripSlashesDeep($_POST);
    $_COOKIE = stripSlashesDeep($_COOKIE);
  }
}

function unregisterGlobals() {
  if (ini_get('register_globals')) {
    $array = array('_SESSION', '_POST', '_GET', '_COOKIE', '_REQUEST', '_SERVER', '_ENV', '_FILES');
    foreach ($array as $value) {
      foreach ($GLOBALS[$value] as $key => $var) {
        if ($var === $GLOBALS[$key]) {
          unset($GLOBALS[$key]);
        }
      }
    }
  }
}

$url = isset($_GET['url']) ? $_GET['url'] : 'home';
$view = ROOT . DS . 'app' . DS . 'views' . DS . "$url.php";

function callRoute() {
  global $view;

  if (empty($_SERVER['HTTP_X_REQUESTED_WITH'])) {
    header("HTTP/1.0 404 Not Found", true, 404);
  }

  if (file_exists($view)) {
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest' && strpos($view, 'ajax') === false) {
      header("HTTP/1.0 404 Not Found", true, 404);
      require_once(ROOT . DS . 'public' . DS . '404.html');
    } else {
      ob_start();
      include $view;
      $content = ob_get_clean();
      require_once(ROOT . DS . 'app' . DS . 'views' . DS . 'layout.php');
    }
  } else {
    header("HTTP/1.0 404 Not Found", true, 404);
    require_once(ROOT . DS . 'public' . DS . '404.html');
  }
}

removeMagicQuotes();
unregisterGlobals();
callRoute();
