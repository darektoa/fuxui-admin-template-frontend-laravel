<?php

namespace App\Http\Requests\V1\User\Role;

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
            'codename'          => 'required|max:20',
            'name'              => 'required|max:255',
            'menuPermissions'   => 'nullable|array',
            'menuPermissions.*' => 'required'
        ];
    }
}
