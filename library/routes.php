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

$url = empty($_GET['url']) ? 'home' : $_GET['url'];

function callRoute() {
  global $url;
  if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    $ajax_view = ROOT . DS . 'app' . DS . 'views' . DS . 'ajax' . DS . $url.'.php';
    if (file_exists($ajax_view)) {
      include $ajax_view;
    } else {
      header('HTTP/1.0 404 Not Found', true, 404);
    }
  } else {
    $view = ROOT . DS . 'app' . DS . 'views' . DS . $url.'.php';
    if (file_exists($view)) {
      ob_start();
      include $view;
      $view_content = ob_get_contents();
      ob_end_clean();

      ob_start();
      require(ROOT . DS . 'app' . DS . 'views' . DS . 'layout.php');
      $page_content = ob_get_contents();
      ob_end_clean();

      return_content($view, $page_content);
    } else {
      header('HTTP/1.0 404 Not Found', true, 404);
      require(ROOT . DS . 'public' . DS . '404.html');
    }
  }
}

function return_content(&$view, &$page_content) {
  $modified_times = [
    filemtime(ROOT . DS . 'config' . DS . 'rev-manifest.json'),
    filemtime(ROOT . DS .'app' . DS . 'views' . DS . 'layout.php'),
    filemtime(ROOT . DS .'app' . DS . 'views' . DS . '_header.php'),
    filemtime(ROOT . DS .'app' . DS . 'views' . DS . '_footer.php'),
    filemtime($view)
  ];

  $included_files = get_included_files();
  foreach ($included_files as $filename) {
    array_push($modified_times, filemtime($filename));
  }

  $last_modified_time = max($modified_times);
  $if_modified_since = (isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) ? $_SERVER['HTTP_IF_MODIFIED_SINCE'] : false);

  header('Last-Modified: '.gmdate('D, d M Y H:i:s', $last_modified_time).' GMT');
  header('Cache-Control: public');

  if (@strtotime($if_modified_since) == $last_modified_time) {
    header('HTTP/1.1 304 Not Modified', true, 304);
    header('Connection: close');
    exit();
  } else {
    header('HTTP/1.1 200 OK', true, 200);
    header('Content-Length: ' . strlen($page_content));
    echo $page_content;
  }
};

removeMagicQuotes();
unregisterGlobals();
callRoute();
