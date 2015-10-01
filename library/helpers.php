<?php

$rev_string = file_get_contents(ROOT . DS . 'config' . DS . 'rev-manifest.json');
$rev_array = json_decode($rev_string, true);

function stylesheet($file) {
  global $rev_array;
  $rev_file = isset($rev_array["$file.css"]) ? $rev_array["$file.css"] : "$file.css";
  return "<link rel='stylesheet' href='assets/$rev_file'>";
}

function javascript($file) {
  global $rev_array;
  $rev_file = isset($rev_array["$file.js"]) ? $rev_array["$file.js"] : "$file.js";
  return "<script src='assets/$rev_file'></script>";
}

function image_src($file) {
  global $rev_array;
  $rev_file = isset($rev_array["$file"]) ? $rev_array["$file"] : $file;
  return "assets/$file";
}

function issetor(&$var, $default = false) {
  return isset($var) ? $var : $default;
}

function setoradd(&$var, $addition) {
  if (isset($var)) {
    return $var .= $addition;
  } else {
    return $var = $addition;
  }
}
