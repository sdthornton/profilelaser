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

function callRoute(&$url) {
  if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    ajaxRoute($url);
  } else {
    standardRoute($url);
  }
}

function ajaxRoute(&$url) {
  $view = ROOT . DS . 'app' . DS . 'views' . DS . 'ajax' . DS . $url.'.php';
  if (file_exists($view)) {
    include $view;
  } else {
    header('HTTP/1.0 404 Not Found', true, 404);
  }
  exit();
}

function standardRoute(&$url) {
  $view = ROOT . DS . 'app' . DS . 'views' . DS . $url.'.php';

  cacheControl($url, $view);

  if (file_exists($view)) {
    ob_start();
    include $view;
    $view_content = ob_get_contents();
    ob_end_clean();

    ob_start();
    require(ROOT . DS . 'app' . DS . 'views' . DS . 'layout.php');
    $page_content = ob_get_contents();
    ob_end_clean();

    buildCache($url, $page_content);
    header('HTTP/1.1 200 OK', true, 200);
    header('Content-Length: ' . strlen($page_content));
    echo $page_content;
  } else {
    header('HTTP/1.0 404 Not Found', true, 404);
    require(ROOT . DS . 'public' . DS . '404.html');
  }
  exit();
}

function cacheControl(&$url, &$view) {
  $cached_view = ROOT . DS . 'cache' . DS . $url.'.html';

  if (file_exists($cached_view)) {
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
    $last_cache_time = filemtime($cached_view);

    if ($last_cache_time >= $last_modified_time) {
      $if_modified_since = (isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) ? $_SERVER['HTTP_IF_MODIFIED_SINCE'] : false);

      header('Last-Modified: '.gmdate('D, d M Y H:i:s', $last_cache_time).' GMT');
      header('Cache-Control: public');

      if (@strtotime($if_modified_since) == $last_cache_time) {
        header('HTTP/1.1 304 Not Modified', true, 304);
        header('Connection: close');
      } else {
        header('HTTP/1.1 200 OK', true, 200);
        header('Content-Length: ' . filesize($cached_view));
        readfile($cached_view);
      }
      exit();
    } else {
      return;
    }
  } else {
    return;
  }
}

function buildCache(&$url, &$content) {
  $view = ROOT . DS . 'cache' . DS . $url.'.html';
  $fp = fopen($view, 'w');
  fwrite($fp, $content);
  fclose($fp);
}

removeMagicQuotes();
unregisterGlobals();
callRoute($url);
