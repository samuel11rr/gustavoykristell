<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DB;
use Input;

class CatalogosController extends Controller
{
    public function categoriasArticulos(){
      return DB::table('tiposArticulos')->get();
    }

    public function guardaArticulo(){
      // file_put_contents($payload['avatar']['filename'], base64_decode($payload['avatar']['value']));
      $data = Input::all();
      return $data;
      // Image::make( file_get_contents( $data->base64_image ) )
    }
}
