<?php

namespace App\Helpers;

use App\Exceptions\ResponseException;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class ResponseHelper {
    /**
     * Make API Response
     *
     * @param mixed $data
     * @param string $message
     * @param int $status
     * @return \Illuminate\Http\JsonResponse
     */
    static public function make($data=[], string $message='OK', $status=200) {
        return response()->json([
            'status'  => $status,
            'message' => $message,
            'data'    => $data,
        ], $status);
    }


    /**
     * Make API Response for 201(created) status
     *
     * @param mixed $data
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    static public function created($data=[], string $message='Created') {
        return response()->json([
            'status'  => Response::HTTP_CREATED ?? 201,
            'message' => $message,
            'data'    => $data,
        ], Response::HTTP_CREATED ?? 201);
    }


    /**
     * Make Error API Response
     *
     * @param mixed|\App\Exceptions\ResponseException $errors
     * @param string $message
     * @param int $status
     * @return \Illuminate\Http\JsonResponse
     */
    static public function error($errors=[], string $message='Failed', $status=500) {
        if($errors instanceof ResponseException) {
            $status     = $errors->getCode();
            $message    = $errors->getMessage();
            $errors     = $errors->getErrors();
        }

        return response()->json([
            'status'    => $status,
            'message'   => $message,
            'errors'    => $errors,
        ], $status);
    }


    /**
     * Make Paginate API Response
     *
     * @param mixed $data
     * @param string $message
     * @param int $status
     * @return \Illuminate\Http\JsonResponse
     */
    static public function paginate($data=[], string $message='OK', $status=200) {
        $response = collect([
            'status'    => $status,
            'message'   => $message,
        ]);

        if($data instanceof JsonResource) $response = $response->merge([
            'data'          => $data,
            'current_page'  => $data->resource->currentPage(),
            'last_page'     => $data->resource->lastPage(),
            'per_page'      => $data->resource->perPage(),
            'total'         => $data->resource->total(),
        ]);
        else $response = $response ->merge($data);

        return response()->json($response);
    }
}
