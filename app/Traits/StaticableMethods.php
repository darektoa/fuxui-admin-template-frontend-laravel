<?php

namespace App\Traits;

trait StaticableMethods
{
    /**
     * Handle dynamic method calls into the class.
     *
     * @param string $method
     * @param array $args
     * @return mixed
     * @throws \Exception
     */
    public function __call($method, $args)
    {
        $class = new \ReflectionClass($this);

        if(! $class->hasMethod($method))
            throw new \Exception("Method $method does not exist");

        $method = $class->getMethod($method);

        if(! $method->isProtected())
            throw new \Exception("Cannot call private method $method");

        return $method->invoke($this, ...$args);

    }

    /**
     * Handle static method calls into the class.
     *
     * @param string $method
     * @param array $args
     * @return mixed
     * @throws \Exception
     */
    public static function __callStatic($method, $args)
    {
        $instance = new static;

        if(! method_exists($instance, $method))
            throw new \Exception("Method $method does not exist");

        return $instance->$method(...$args);
    }
}
