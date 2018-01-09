<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DB;
use Input;

date_default_timezone_set('America/Mexico_City');

class CatalogosController extends Controller
{
    public function categoriasArticulos(){
      return DB::table('tiposArticulos')->get();
    }

    public function guardaArticulo(){
      $data = Input::all();

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
      }

      return array('respuesta' => 'correcto');
    }
}
