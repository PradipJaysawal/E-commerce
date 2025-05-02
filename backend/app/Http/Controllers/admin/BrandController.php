<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    //this method will return all the brands
    public function index()
    {
        $brands = Brand::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => 200,
            'data' => $brands
        ]);
    }

    //this method will store brand in db
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name'=> 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $brand = new Brand();
        $brand->name = $request->name;
        $brand->status = $request->status;
        $brand->save();

        return response()->json([
            'status' => 200,
            'message' => 'Brand added successfully',
            'data' => $brand
        ], 200);
    }

    //this method will return single brand
     public function show($id){
        $brand = Brand::find($id);

        if($brand == null){
            return response()->json([
                'status' => 404,
                'message' => 'Brand not found'
            ], 404);
        }
        return response()->json([
            'status' => 200,
            'data' => $brand
        ]);
    }

    //this method will update single brand
    public function update($id, Request $request){
        $brand = Brand::find($id);

        if($brand == null){
            return response()->json([
                'status' => 404,
                'message' => 'Brand not found',
                'data' =>[]
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name'=> 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $brand->name = $request->name;
        $brand->status = $request->status;
        $brand->save();

        return response()->json([
            'status' => 200,
            'message' => 'Brand updated successfully',
            'data' => $brand
        ], 200);
    }

    //this method will destroy single brand
    public function destroy($id){
        $brand = Brand::find($id);

        if($brand == null){
            return response()->json([
                'status' => 404,
                'message' => 'Brand not found'
            ], 404);
        }
        $brand->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Brand deleted successfully'
        ], 200);
    }
}
