<?php

/* /var/www/ptn.local/themes/demo/layouts/default.htm */
class __TwigTemplate_1cdc1238f78a4a9c0ff2f7f9374942f369afb945031dcf25a56ffca7ec62ec75 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<!DOCTYPE html>
<html>
    <head>
        <meta charset=\"utf-8\">
        <title>October CMS - ";
        // line 5
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["this"]) ? $context["this"] : null), "page", array()), "title", array()), "html", null, true);
        echo "</title>
        <meta name=\"description\" content=\"";
        // line 6
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["this"]) ? $context["this"] : null), "page", array()), "meta_description", array()), "html", null, true);
        echo "\">
        <meta name=\"title\" content=\"";
        // line 7
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute((isset($context["this"]) ? $context["this"] : null), "page", array()), "meta_title", array()), "html", null, true);
        echo "\">
        <meta name=\"author\" content=\"October CMS\">
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
        <link rel=\"icon\" type=\"image/png\" href=\"";
        // line 10
        echo $this->env->getExtension('CMS')->themeFilter("assets/images/october.png");
        echo "\" />
        ";
        // line 11
        echo $this->env->getExtension('CMS')->assetsFunction('css');
        echo $this->env->getExtension('CMS')->displayBlock('styles');
        // line 12
        echo "        <link href=\"";
        echo $this->env->getExtension('CMS')->themeFilter(array(0 => "assets/css/theme.css"));
        // line 14
        echo "\" rel=\"stylesheet\">
    </head>
    <body>

        <!-- Header -->
        <header id=\"layout-header\">

            <!-- Nav -->
            <nav id=\"layout-nav\" class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">
                <div class=\"container\">
                    <div class=\"navbar-header\">
                        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-main-collapse\">
                            <span class=\"sr-only\">Toggle navigation</span>
                            <span class=\"icon-bar\"></span>
                            <span class=\"icon-bar\"></span>
                            <span class=\"icon-bar\"></span>
                        </button>
                        <a class=\"navbar-brand\" href=\"";
        // line 31
        echo $this->env->getExtension('CMS')->pageFilter("home");
        echo "\">October Demo</a>
                    </div>
                    <div class=\"collapse navbar-collapse navbar-main-collapse\">
                        <ul class=\"nav navbar-nav\">
                            <li class=\"";
        // line 35
        if (($this->getAttribute($this->getAttribute((isset($context["this"]) ? $context["this"] : null), "page", array()), "id", array()) == "home")) {
            echo "active";
        }
        echo "\"><a href=\"";
        echo $this->env->getExtension('CMS')->pageFilter("home");
        echo "\">Basic concepts</a></li>
                            <li class=\"";
        // line 36
        if (($this->getAttribute($this->getAttribute((isset($context["this"]) ? $context["this"] : null), "page", array()), "id", array()) == "ajax")) {
            echo "active";
        }
        echo "\"><a href=\"";
        echo $this->env->getExtension('CMS')->pageFilter("ajax");
        echo "\">AJAX framework</a></li>
                            <li class=\"";
        // line 37
        if (($this->getAttribute($this->getAttribute((isset($context["this"]) ? $context["this"] : null), "page", array()), "id", array()) == "plugins")) {
            echo "active";
        }
        echo "\"><a href=\"";
        echo $this->env->getExtension('CMS')->pageFilter("plugins");
        echo "\">Plugin components</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

        </header>

        <!-- Content -->
        <section id=\"layout-content\">
            ";
        // line 47
        echo $this->env->getExtension('CMS')->pageFunction();
        // line 48
        echo "        </section>

        <!-- Footer -->
        <footer id=\"layout-footer\">
            ";
        // line 52
        $context['__cms_partial_params'] = [];
        echo $this->env->getExtension('CMS')->partialFunction("footer"        , $context['__cms_partial_params']        );
        unset($context['__cms_partial_params']);
        // line 53
        echo "        </footer>

        <!-- Scripts -->
        <script src=\"";
        // line 56
        echo $this->env->getExtension('CMS')->themeFilter(array(0 => "assets/javascript/jquery.js", 1 => "assets/vendor/bootstrap/js/transition.js", 2 => "assets/vendor/bootstrap/js/alert.js", 3 => "assets/vendor/bootstrap/js/button.js", 4 => "assets/vendor/bootstrap/js/carousel.js", 5 => "assets/vendor/bootstrap/js/collapse.js", 6 => "assets/vendor/bootstrap/js/dropdown.js", 7 => "assets/vendor/bootstrap/js/modal.js", 8 => "assets/vendor/bootstrap/js/tooltip.js", 9 => "assets/vendor/bootstrap/js/popover.js", 10 => "assets/vendor/bootstrap/js/scrollspy.js", 11 => "assets/vendor/bootstrap/js/tab.js", 12 => "assets/vendor/bootstrap/js/affix.js", 13 => "assets/javascript/app.js"));
        // line 71
        echo "\"></script>
        ";
        // line 72
        echo '<script src="'. Request::getBasePath()
                .'/modules/system/assets/js/framework.js"></script>'.PHP_EOL;
        echo '<script src="'. Request::getBasePath()
                    .'/modules/system/assets/js/framework.extras.js"></script>'.PHP_EOL;
        echo '<link href="'. Request::getBasePath()
                    .'/modules/system/assets/css/framework.extras.css" rel="stylesheet">'.PHP_EOL;
        // line 73
        echo "        ";
        echo $this->env->getExtension('CMS')->assetsFunction('js');
        echo $this->env->getExtension('CMS')->displayBlock('scripts');
        // line 74
        echo "
    </body>
</html>";
    }

    public function getTemplateName()
    {
        return "/var/www/ptn.local/themes/demo/layouts/default.htm";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  141 => 74,  137 => 73,  130 => 72,  127 => 71,  125 => 56,  120 => 53,  116 => 52,  110 => 48,  108 => 47,  91 => 37,  83 => 36,  75 => 35,  68 => 31,  49 => 14,  46 => 12,  43 => 11,  39 => 10,  33 => 7,  29 => 6,  25 => 5,  19 => 1,);
    }
}
/* <!DOCTYPE html>*/
/* <html>*/
/*     <head>*/
/*         <meta charset="utf-8">*/
/*         <title>October CMS - {{ this.page.title }}</title>*/
/*         <meta name="description" content="{{ this.page.meta_description }}">*/
/*         <meta name="title" content="{{ this.page.meta_title }}">*/
/*         <meta name="author" content="October CMS">*/
/*         <meta name="viewport" content="width=device-width, initial-scale=1.0">*/
/*         <link rel="icon" type="image/png" href="{{ 'assets/images/october.png'|theme }}" />*/
/*         {% styles %}*/
/*         <link href="{{ [*/
/*             'assets/css/theme.css'*/
/*         ]|theme }}" rel="stylesheet">*/
/*     </head>*/
/*     <body>*/
/* */
/*         <!-- Header -->*/
/*         <header id="layout-header">*/
/* */
/*             <!-- Nav -->*/
/*             <nav id="layout-nav" class="navbar navbar-inverse navbar-fixed-top" role="navigation">*/
/*                 <div class="container">*/
/*                     <div class="navbar-header">*/
/*                         <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">*/
/*                             <span class="sr-only">Toggle navigation</span>*/
/*                             <span class="icon-bar"></span>*/
/*                             <span class="icon-bar"></span>*/
/*                             <span class="icon-bar"></span>*/
/*                         </button>*/
/*                         <a class="navbar-brand" href="{{ 'home'|page }}">October Demo</a>*/
/*                     </div>*/
/*                     <div class="collapse navbar-collapse navbar-main-collapse">*/
/*                         <ul class="nav navbar-nav">*/
/*                             <li class="{% if this.page.id == 'home' %}active{% endif %}"><a href="{{ 'home'|page }}">Basic concepts</a></li>*/
/*                             <li class="{% if this.page.id == 'ajax' %}active{% endif %}"><a href="{{ 'ajax'|page }}">AJAX framework</a></li>*/
/*                             <li class="{% if this.page.id == 'plugins' %}active{% endif %}"><a href="{{ 'plugins'|page }}">Plugin components</a></li>*/
/*                         </ul>*/
/*                     </div>*/
/*                 </div>*/
/*             </nav>*/
/* */
/*         </header>*/
/* */
/*         <!-- Content -->*/
/*         <section id="layout-content">*/
/*             {% page %}*/
/*         </section>*/
/* */
/*         <!-- Footer -->*/
/*         <footer id="layout-footer">*/
/*             {% partial "footer" %}*/
/*         </footer>*/
/* */
/*         <!-- Scripts -->*/
/*         <script src="{{ [*/
/*             'assets/javascript/jquery.js',*/
/*             'assets/vendor/bootstrap/js/transition.js',*/
/*             'assets/vendor/bootstrap/js/alert.js',*/
/*             'assets/vendor/bootstrap/js/button.js',*/
/*             'assets/vendor/bootstrap/js/carousel.js',*/
/*             'assets/vendor/bootstrap/js/collapse.js',*/
/*             'assets/vendor/bootstrap/js/dropdown.js',*/
/*             'assets/vendor/bootstrap/js/modal.js',*/
/*             'assets/vendor/bootstrap/js/tooltip.js',*/
/*             'assets/vendor/bootstrap/js/popover.js',*/
/*             'assets/vendor/bootstrap/js/scrollspy.js',*/
/*             'assets/vendor/bootstrap/js/tab.js',*/
/*             'assets/vendor/bootstrap/js/affix.js',*/
/*             'assets/javascript/app.js'*/
/*         ]|theme }}"></script>*/
/*         {% framework extras %}*/
/*         {% scripts %}*/
/* */
/*     </body>*/
/* </html>*/
