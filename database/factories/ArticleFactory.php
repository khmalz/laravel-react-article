<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $title = rtrim(fake()->sentence(rand(3, 6)), '.');
        $slug = Str::slug($title);

        return [
            'user_id' => User::all()->random()->id,
            'title' => $title,
            'slug' => $slug,
            'body' => fake()->paragraph(8)
        ];
    }
}
