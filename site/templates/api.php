<?php

// if(!r::is_ajax()) notFound();

header('Content-type: application/json; charset=utf-8');

$data = $pages->find('projects')->children()->visible();

// build array basics
$json = array();
$json['projects'] = array();

// build array result data
foreach($data as $project) {

  $featuredimage = '';
  if($image = $project->featuredimage()) {
    $featuredimage = $project->image($image)->url();
  }

  $json['projects'][] = array(
    'url'   => (string)$project->url(),
    'slug' => (string)$project->slug(),
    'description'  => (string)excerpt($project->description(), 1000),
    'year' => (string)$project->year(),
    'project_url' => (string)$project->projecturl(),
    'tags'  => (string)$project->tags(),
    'featuredimage' => (string)$featuredimage,
    'featuredcolour' => (string)$project->featuredcolour(),
    // 'image' => $image_data,
  );
}

// retrieve Blog content from Wordpress API
$url = 'https://spreadsheet.glitch.me/?key=171Ur45EUbxpG3f6sujgo_UgElyFSF2RKcXFohvGIG_M';
$json_data = file_get_contents($url);
$data = json_decode($json_data, true);

foreach($data as $item) {
  $json['location'][] = $item;
}

echo json_encode($json);
