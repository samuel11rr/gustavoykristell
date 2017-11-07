<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input; //debe agregarse 

class PruebasController extends Controller
{
    public function index()
    {
        $dato1 =  Input::get('dato1');
        $dato2 =  Input::get('dato2');
        $respuesta = 'Se recibió "'.$dato1.'" y "'.$dato2.'" desde angularjs. Att. Laravel.';
        return $respuesta;
    }
}
