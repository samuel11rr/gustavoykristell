<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DB;
use Input;

class UsersController extends Controller
{
    public function index()
    {
      $respuesta = DB::table('usuarios')
											->where('USU_id', '=', 1)
											->get();

  		return $respuesta;
    }

    public function login()
    {
      $username	= Input::get('username');
      $password = Input::get('password');

      $respuesta = DB::table('usuarios')
                      ->select('USU_id', 'USU_nombre', 'USU_username', 'TIU_clave', DB::raw('CONCAT("true") as success'))
											->where('USU_username', '=', $username)
                      ->where('USU_password', '=', MD5($password))
											->get();

  		return $respuesta;
    }
}
