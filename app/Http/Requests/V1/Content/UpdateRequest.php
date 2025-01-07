<?php

namespace App\Http\Requests\V1\Content;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
            'directoryId'       => 'nullable',
            'typeId'            => 'nullable',
            'usingContentId'    => 'nullable',
            'name'              => 'nullable|max:255',
            'codename'          => "nullable|max:32",
            'value'             => 'nullable',
            'json'              => 'nullable|json',
            'order'             => 'nullable|integer',
        ];
    }
}
