<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DB;
use Input;

class UsersController extends Controller
{
    public function login()
    {
      $username	= Input::get('username');
      $password = Input::get('password');

      try {
        $respuesta = DB::table('usuarios')
                        ->select('USU_id', 'USU_nombre', 'USU_username', 'TIU_clave', DB::raw('CONCAT("true") as success'))
                        ->where('USU_username', '=', $username)
                        ->where('USU_password', '=', MD5($password))
                        ->where('USU_activo', '=', 1)
  											->get();

        if ( sizeof($respuesta) == 0 ) {
          $respuesta[] = array('success' => false, 'error' => 'Usuario o contraseña invalidos' );
        }else {
          $respuesta[0]->success = true;
        }

      } catch (Exception $e) {
        $respuesta[] = array('success' => false, 'error' => $e );
      }

  		return $respuesta;
    }
}
