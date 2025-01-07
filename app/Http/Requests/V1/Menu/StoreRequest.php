<?php

namespace App\Http\Requests\V1\Menu;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'menuId'            => 'nullable',
            'codename'          => 'required|max:32',
            'name'              => 'required|max:32',
            'iconUri'           => 'nullable|max:255',
            'uri'               => 'nullable|max:255',
            'isExternalUri'     => 'nullable|integer',
            'description'       => 'nullable|max:512',
            'tooltip'           => 'nullable|max:100',
            'depth'             => 'nullable|integer|max:255',
            'order'             => 'nullable|integer|max:255',
        ];
    }
}


