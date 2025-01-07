<?php

namespace App\Rules;

use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class MaxDate implements ValidationRule
{
    public function __construct(
        protected string $min,
    ){

    }


    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     *
     * @throws Carbon\Exceptions\InvalidFormatException
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $valueDate = Carbon::parse($value);

        if($valueDate->lessThan($this->min))
            $fail("The :attribute must be greater than or equal to {$this->min}");
    }
}
