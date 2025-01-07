<?php

namespace App\Rules;

use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class MaxDate implements ValidationRule
{
    public function __construct(
        protected string $max,
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

        if($valueDate->greaterThan($this->max))
            $fail("The :attribute must be less than or equal to {$this->max}");
    }
}
