<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DB;
use Input;

date_default_timezone_set('America/Mexico_City');

class CatalogosController extends Controller
{
    public function categoriasArticulos(){
      return DB::table('tiposArticulos')
               ->where('TIA_clave', '<>', 5)
               ->where('TIA_clave', '<>', 4)
               ->get();
    }

    public function guardaArticulo(){
      $data = Input::all();

      $nombre       = CatalogosController::limpiaCadena( Input::get('nombre') );
      $descripcion  = CatalogosController::limpiaCadena( Input::get('descripcion') );
      $categoria    = Input::get('categoria');
      $enlace       = Input::get('enlace');
      $usuario      = Input::get('usuario');

      try {
        $idArticulo = DB::table('articulos')
    										->insertGetId([ 'ART_nombre' => $nombre,
                                        'TIA_clave' => $categoria,
                                        'ART_descripcion' => $descripcion,
                                        'ART_url' => $enlace,
                                        'ART_creador'=> $usuario
    																	]);
      } catch (Exception $e) {

      }

      $resImg = 'N/A';

      if ($data['img']['value'] != '') {
        //creamos la carpeta de subidas si es que no existe
        $carpeta = '../imgArticulos/';
        if (!file_exists($carpeta)) {
            mkdir($carpeta, 0777, true);
        }

        //guardamos la imagen en la carpeta publica
        file_put_contents($data['img']['filename'], base64_decode($data['img']['value']));

        //definimos el nuevo nombre que tendrá la imagen
        $fecha = date('YmdHis');
        $extension = pathinfo($data['img']['filename'], PATHINFO_EXTENSION);
        $nombreNuevo = $fecha.'.'.$extension;

        //copiamos la imagen de la carpeta publica a la nueva carpeta
        copy($data['img']['filename'] , $carpeta.$nombreNuevo);

        //eliminamos la imagen que quedó en la carpeta publica
        unlink($data['img']['filename']);

        try {
    			$resImg = DB::table('articulos')
    											->where('ART_id', $idArticulo)
    											->update(['ART_img'	=> $nombreNuevo]);
    		} catch (Exception $e) {
    			$resImg = array('error' => $e, 'mensaje' => 'error al actualizar');
    		}
      }

      return array('respuesta' => 'correcto', 'DB' => $idArticulo, 'img' => $resImg);
    }

    public function limpiaCadena( $cadena ) {
  		$noPermitidos = array("'", '\\', '<', '>', "\"");
  		$cadenaLimpia = str_replace($noPermitidos,"", $cadena);

  		return $cadenaLimpia;
  	}

    public function listadoArticulos() {
      return DB::table('articulos')->get();
  	}

    public function eliminaArticulo() {
      $idArticulo = Input::get('idArticulo');
      $usuario    = Input::get('usuario');
      $img        = Input::get('img');

      try {
        $usrExists = DB::table('usuarios')
                        ->select('USU_username')
                        ->where('USU_username', $usuario)
                        ->where('USU_activo', 1)
                        ->get();

        if ( sizeof($usrExists) > 0 && $usrExists[0]->USU_username == $usuario) {
          $respuesta = DB::table('articulos')
                          ->where('ART_id', $idArticulo)
                          ->delete();

          if ( $img != null || $img != '' ) {
            unlink('../imgArticulos/'.$img);
          }
        } else{
          $respuesta = 'no permitido';
        }
      } catch (Exception $e) {
        $respuesta = $e;
      }

      return array( 'respuesta' => $respuesta );
  	}

    public function asignaDonador() {
      $idArticulo = Input::get('ART_id');
      $donador    = Input::get('donador');

      try {
        $respuesta = DB::table('articulos')
                        ->where('ART_id', $idArticulo)
                        ->update([
                                  'ART_donador'   => $donador,
                                  'ART_apartado'  => DB::raw('1')
                                  ]);
      } catch (Exception $e) {
        $respuesta = $e;
      };

      return array( 'respuesta' => $respuesta );
  	}



}
