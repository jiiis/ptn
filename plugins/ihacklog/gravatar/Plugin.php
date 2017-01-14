<?php namespace Ihacklog\Gravatar;

use System\Classes\PluginBase;

/**
 * Gravatar Plugin Information File
 */
class Plugin extends PluginBase
{
    /**
     * Returns information about this plugin.
     *
     * @return array
     */
    public function pluginDetails()
    {
        return [
            'name'        => 'Gravatar',
            'description' => 'October gravatar helper for theme',
            'author'      => '荒野无灯',
            'icon'        => 'icon-leaf'
        ];
    }

    public function boot()
    {
//        $this->app->register('Thomaswelton\LaravelGravatar\LaravelGravatarServiceProvider');
        \App::register('Thomaswelton\LaravelGravatar\LaravelGravatarServiceProvider');
        \Illuminate\Foundation\AliasLoader::getInstance()
            ->alias('Gravatar', 'Thomaswelton\LaravelGravatar\Facades\Gravatar');
    }

    public function registerMarkupTags()
    {
        return [
            'functions' => [
                // A local method
                'gravatar' => [$this, 'makeGravatar'],
            ]
        ];
    }

    public function makeGravatar($email, $alt = null, $attributes = [], $rating = null)
    {
//        return \Thomaswelton\LaravelGravatar\Facades\Gravatar::image($email, $alt, $attributes, $rating);
        return \Gravatar::image($email, $alt, $attributes, $rating);
    }
}
