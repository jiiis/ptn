<?php

/* /var/www/ptn.local/themes/demo/pages/home.htm */
class __TwigTemplate_9010a54800a979f0c24b749b5b682f655b8f4008c93045c71d8fd552e072560a extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            '__internal_7f23786be1c379a3247304a57c174ab2d3e1a79a67ff056321648bc58ba4315d' => array($this, 'block___internal_7f23786be1c379a3247304a57c174ab2d3e1a79a67ff056321648bc58ba4315d'),
            '__internal_daad8df92919a2c22bc7b63829ad8441d3a67aa81a4ee199bd13f491928af86c' => array($this, 'block___internal_daad8df92919a2c22bc7b63829ad8441d3a67aa81a4ee199bd13f491928af86c'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<div class=\"jumbotron\">
    <div class=\"container\">
        ";
        // line 3
        $context['__cms_content_params'] = [];
        echo $this->env->getExtension('CMS')->contentFunction("welcome.htm"        , $context['__cms_content_params']        );
        unset($context['__cms_content_params']);
        // line 4
        echo "    </div>
</div>

<div class=\"container\">

    <div class=\"page-header\">
        <h2>Overview <small>Basic concepts</small></h2>
    </div>
    <p>
        This page demonstrates the basic CMS features.
        Usually each page built with October is a combination of a layout, page, partials and content blocks,
        although in simple cases you can just use a page without anything else.
    </p>

    <!-- Layouts -->
    <h3>Layouts</h3>
    <p class=\"lead\">
        <i class=\"icon-th-large\"></i> &nbsp; Layouts define the page scaffold.
    </p>
    <p>
        The layout file <code>layouts/default.htm</code> defines the page scaffold &mdash;
        everything that repeats on each page, such as the HTML, HEAD and BODY tags, StyleSheet and JavaScript references.
    </p>
    <p>
        The page menu and footer in the Demo theme are defined in the layout as well.
    </p>

    <hr />

    <!-- Pages -->
    <h3>Pages</h3>
    <p class=\"lead\">
        <i class=\"icon-copy\"></i> &nbsp; Pages hold the content for each URL.
    </p>
    <p>
        The page file <code>pages/home.htm</code> defines the page URL (<code>/</code> for this page) and the page content.
        Pages are rendered inside layouts with this function that should be called in the layout code:
        <pre>";
        // line 41
        echo "{% page %}";
        echo "</pre>
        Using a layout for pages is optional &mdash; you can define everything right in the page file.
    </p>

    <hr />

    <!-- Partials -->
    <h3>Partials</h3>
    <p class=\"lead\">
        <i class=\"icon-tags\"></i> &nbsp; Partials contain reusable chunks of HTML markup.
    </p>
    <p>
        Partials are chunks of HTML defined in separate files which can be included anywhere.
        In this example we placed the footer content to the <code>partials/footer.htm</code> partial.
        Partials are rendered with:
        <pre>";
        // line 56
        echo "{% partial \"partial-name\" %}";
        echo "</pre> 
        It can be used inside pages, templates or other partials.
    </p>

    <hr />

    <!-- Content blocks -->
    <h3>Content blocks</h3>
    <p class=\"lead\">
        <i class=\"icon-font\"></i> &nbsp; Content blocks are text or HTML blocks that can be edited separately from the page or layout.
    </p>
    <p>
        The introductory text used on this page is defined in the <code>content/welcome.htm</code> file.
        Content blocks are defined and rendered with: 
        <pre>";
        // line 70
        echo "{% content \"content-name.htm\" %}";
        echo "</pre>
    </p>

    <hr />

    <!-- Placeholders -->
    <h3>Placeholders</h3>
    <p class=\"lead\">
        <i class=\"icon-bookmark\"></i> &nbsp; Placeholders allow pages to inject content to a layout.
    </p>
    <p>
        The common use is injecting page-specific links to StyleSheet or JavaScript files to the HEAD tag defined in the layout.
        Placeholders are defined in the layout file and they have names so that they can be referred in the page.
        Example:
    </p>
    <div class=\"row\">
        <div class=\"col-md-6\">
            Layout file:
            <pre>";
        // line 88
        echo twig_escape_filter($this->env, (string) $this->renderBlock("__internal_7f23786be1c379a3247304a57c174ab2d3e1a79a67ff056321648bc58ba4315d", $context, $blocks));
        echo "</pre>
        </div>
        <div class=\"col-md-6\">
            Page file:
            <pre>";
        // line 92
        echo twig_escape_filter($this->env, (string) $this->renderBlock("__internal_daad8df92919a2c22bc7b63829ad8441d3a67aa81a4ee199bd13f491928af86c", $context, $blocks));
        echo "</pre>
        </div>
    </div>

    <hr />

    <!-- Assets -->
    <h3>Assets</h3>
    <p class=\"lead\">
        <i class=\"icon-picture\"></i> &nbsp; Assets are resource files like images and stylesheets.
    </p>
    <p>This theme stores its asset files (JavaScript, StyleSheet, images, fonts, etc) in the <code>themes/demo/assets</code> directory. This theme is also packaged with these useful 3rd party tools:</p>
    <ul class=\"list-inline\">
        <li><a target=\"_blank\" href=\"http://getbootstrap.com/\">Twitter Bootstrap</a></li>
        <li><a target=\"_blank\" href=\"http://fontawesome.io/3.2.1/\">Font Awesome</a></li>
        <li><a target=\"_blank\" href=\"http://www.google.com/fonts/specimen/Lato\">Lato webfont</a></li>
    </ul>
    <p>You might prefer to remove them for your website implementation.</p>

    <br />

    <div class=\"text-center\">
        <p><a href=\"";
        // line 114
        echo $this->env->getExtension('CMS')->pageFilter("ajax");
        echo "\" class=\"btn btn-lg btn-default\">Continue to AJAX framework</a></p>
    </div>

</div>";
    }

    // line 88
    public function block___internal_7f23786be1c379a3247304a57c174ab2d3e1a79a67ff056321648bc58ba4315d($context, array $blocks = array())
    {
        $context['__cms_content_params'] = [];
        echo $this->env->getExtension('CMS')->contentFunction("placeholder/layout.txt"        , $context['__cms_content_params']        );
        unset($context['__cms_content_params']);
    }

    // line 92
    public function block___internal_daad8df92919a2c22bc7b63829ad8441d3a67aa81a4ee199bd13f491928af86c($context, array $blocks = array())
    {
        $context['__cms_content_params'] = [];
        echo $this->env->getExtension('CMS')->contentFunction("placeholder/page.txt"        , $context['__cms_content_params']        );
        unset($context['__cms_content_params']);
    }

    public function getTemplateName()
    {
        return "/var/www/ptn.local/themes/demo/pages/home.htm";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  172 => 92,  164 => 88,  156 => 114,  131 => 92,  124 => 88,  103 => 70,  86 => 56,  68 => 41,  29 => 4,  25 => 3,  21 => 1,);
    }
}
/* <div class="jumbotron">*/
/*     <div class="container">*/
/*         {% content "welcome.htm" %}*/
/*     </div>*/
/* </div>*/
/* */
/* <div class="container">*/
/* */
/*     <div class="page-header">*/
/*         <h2>Overview <small>Basic concepts</small></h2>*/
/*     </div>*/
/*     <p>*/
/*         This page demonstrates the basic CMS features.*/
/*         Usually each page built with October is a combination of a layout, page, partials and content blocks,*/
/*         although in simple cases you can just use a page without anything else.*/
/*     </p>*/
/* */
/*     <!-- Layouts -->*/
/*     <h3>Layouts</h3>*/
/*     <p class="lead">*/
/*         <i class="icon-th-large"></i> &nbsp; Layouts define the page scaffold.*/
/*     </p>*/
/*     <p>*/
/*         The layout file <code>layouts/default.htm</code> defines the page scaffold &mdash;*/
/*         everything that repeats on each page, such as the HTML, HEAD and BODY tags, StyleSheet and JavaScript references.*/
/*     </p>*/
/*     <p>*/
/*         The page menu and footer in the Demo theme are defined in the layout as well.*/
/*     </p>*/
/* */
/*     <hr />*/
/* */
/*     <!-- Pages -->*/
/*     <h3>Pages</h3>*/
/*     <p class="lead">*/
/*         <i class="icon-copy"></i> &nbsp; Pages hold the content for each URL.*/
/*     </p>*/
/*     <p>*/
/*         The page file <code>pages/home.htm</code> defines the page URL (<code>/</code> for this page) and the page content.*/
/*         Pages are rendered inside layouts with this function that should be called in the layout code:*/
/*         <pre>{{ "{% page %}" }}</pre>*/
/*         Using a layout for pages is optional &mdash; you can define everything right in the page file.*/
/*     </p>*/
/* */
/*     <hr />*/
/* */
/*     <!-- Partials -->*/
/*     <h3>Partials</h3>*/
/*     <p class="lead">*/
/*         <i class="icon-tags"></i> &nbsp; Partials contain reusable chunks of HTML markup.*/
/*     </p>*/
/*     <p>*/
/*         Partials are chunks of HTML defined in separate files which can be included anywhere.*/
/*         In this example we placed the footer content to the <code>partials/footer.htm</code> partial.*/
/*         Partials are rendered with:*/
/*         <pre>{{ "{% partial \"partial-name\" %}" }}</pre> */
/*         It can be used inside pages, templates or other partials.*/
/*     </p>*/
/* */
/*     <hr />*/
/* */
/*     <!-- Content blocks -->*/
/*     <h3>Content blocks</h3>*/
/*     <p class="lead">*/
/*         <i class="icon-font"></i> &nbsp; Content blocks are text or HTML blocks that can be edited separately from the page or layout.*/
/*     </p>*/
/*     <p>*/
/*         The introductory text used on this page is defined in the <code>content/welcome.htm</code> file.*/
/*         Content blocks are defined and rendered with: */
/*         <pre>{{ "{% content \"content-name.htm\" %}" }}</pre>*/
/*     </p>*/
/* */
/*     <hr />*/
/* */
/*     <!-- Placeholders -->*/
/*     <h3>Placeholders</h3>*/
/*     <p class="lead">*/
/*         <i class="icon-bookmark"></i> &nbsp; Placeholders allow pages to inject content to a layout.*/
/*     </p>*/
/*     <p>*/
/*         The common use is injecting page-specific links to StyleSheet or JavaScript files to the HEAD tag defined in the layout.*/
/*         Placeholders are defined in the layout file and they have names so that they can be referred in the page.*/
/*         Example:*/
/*     </p>*/
/*     <div class="row">*/
/*         <div class="col-md-6">*/
/*             Layout file:*/
/*             <pre>{% filter escape %}{% content "placeholder/layout.txt" %}{% endfilter %}</pre>*/
/*         </div>*/
/*         <div class="col-md-6">*/
/*             Page file:*/
/*             <pre>{% filter escape %}{% content "placeholder/page.txt" %}{% endfilter %}</pre>*/
/*         </div>*/
/*     </div>*/
/* */
/*     <hr />*/
/* */
/*     <!-- Assets -->*/
/*     <h3>Assets</h3>*/
/*     <p class="lead">*/
/*         <i class="icon-picture"></i> &nbsp; Assets are resource files like images and stylesheets.*/
/*     </p>*/
/*     <p>This theme stores its asset files (JavaScript, StyleSheet, images, fonts, etc) in the <code>themes/demo/assets</code> directory. This theme is also packaged with these useful 3rd party tools:</p>*/
/*     <ul class="list-inline">*/
/*         <li><a target="_blank" href="http://getbootstrap.com/">Twitter Bootstrap</a></li>*/
/*         <li><a target="_blank" href="http://fontawesome.io/3.2.1/">Font Awesome</a></li>*/
/*         <li><a target="_blank" href="http://www.google.com/fonts/specimen/Lato">Lato webfont</a></li>*/
/*     </ul>*/
/*     <p>You might prefer to remove them for your website implementation.</p>*/
/* */
/*     <br />*/
/* */
/*     <div class="text-center">*/
/*         <p><a href="{{ 'ajax'|page }}" class="btn btn-lg btn-default">Continue to AJAX framework</a></p>*/
/*     </div>*/
/* */
/* </div>*/
