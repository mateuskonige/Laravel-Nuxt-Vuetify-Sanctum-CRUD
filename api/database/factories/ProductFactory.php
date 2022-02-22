<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' =>  ucfirst($this->faker->sentence(1)),
            'amount' =>  $this->faker->randomFloat(2, 1, 10),
        ];
    }
}
