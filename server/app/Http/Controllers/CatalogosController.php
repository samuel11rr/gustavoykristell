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
}
