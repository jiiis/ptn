<?php namespace Ihacklog\Gravatar\models;

use Model;
/**
 * Created by PhpStorm.
 * User: sh4d0walker
 * Date: 2015-10-24
 * Time: 23:12
 */
class Settings extends Model
{
    public $implement = ['System.Behaviors.SettingsModel'];

    // A unique code
    public $settingsCode = 'ihacklog_gravatar_settings';

    // Reference to field configuration
    public $settingsFields = 'fields.yaml';
}