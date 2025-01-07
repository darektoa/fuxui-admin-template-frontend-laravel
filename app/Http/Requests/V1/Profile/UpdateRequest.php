<?php

namespace App\Http\Requests\V1\Profile;

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
            'email'             => "nullable|max:255",
            'username'          => "nullable|max:20",
            'firstname'         => 'nullable|max:32',
            'lastname'          => 'nullable|max:32',
            'birthDate'         => 'nullable|date',
            'birthPlace'        => 'nullable|max:100',
            'phoneNumber'       => 'nullable|max:255',
            'profilePictures'   => 'nullable|array',
            'profilePictures.*' => 'file',
        ];
    }
}
