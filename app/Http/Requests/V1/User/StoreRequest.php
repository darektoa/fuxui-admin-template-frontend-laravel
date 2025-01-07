<?php

namespace App\Http\Requests\V1\User;

use App\Rules\MaxDate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

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
            'roleId'        => 'nullable|array',
            'roleId.*'      => 'nullable|max:26',
            'email'         => 'required|max:255|email',
            'username'      => 'nullable|max:20',
            'firstname'     => 'required|max:32',
            'lastname'      => 'nullable|max:32',
            'birthDate'     => ['nullable', 'date', new MaxDate(now()->format('Y-m-d'))],
            'birthPlace'    => 'nullable|max:100',
            'phoneNumber'   => 'nullable|max:20',
            'password'      => 'nullable',
        ];
    }
}
