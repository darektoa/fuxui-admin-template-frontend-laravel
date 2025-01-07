<?php

namespace App\Http\Requests\V1\User\Role;

use App\Models\User\Role;
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
        $roleId = $this->route('role');

        return [
            'codename'          => "nullable|max:20",
            'name'              => 'nullable|max:255',
            'menuPermissions'   => 'nullable|array',
            'menuPermissions.*' => 'required'
        ];
    }
}
