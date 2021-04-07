export const modules = {

  /* CORE BLOCKS - based on Gutenberg blocks */
  corebutton: () => import(/* webpackChunkName: "spacer" */ '~/modules/gutenberg-blocks/Button.js'),
  corebuttons: () => import(/* webpackChunkName: "group" */ '~/modules/gutenberg-blocks/Group.js'),
  corecolumn: () => import(/* webpackChunkName: "group" */ '~/modules/gutenberg-blocks/Group.js'),
  corecolumns: () => import(/* webpackChunkName: "group" */ '~/modules/gutenberg-blocks/Group.js'),
  coregroup: () => import(/* webpackChunkName: "group" */ '~/modules/gutenberg-blocks/Group.js'),
  coreheading: () => import(/* webpackChunkName: "content" */ '~/modules/soyuz-core/BlockContent.js'),
  coreimage: () => import(/* webpackChunkName: "image" */ '~/modules/soyuz-core/ResponsiveImg.js'),
  coreparagraph: () => import(/* webpackChunkName: "content" */ '~/modules/soyuz-core/BlockContent.js'),
  coreseparator: () => import(/* webpackChunkName: "separator" */ '~/modules/gutenberg-blocks/Separator.js'),
  corespacer: () => import(/* webpackChunkName: "separator" */ '~/modules/gutenberg-blocks/Spacer.js'),
  
  /* Soyuz custom */
  coresvg: () => import(/* webpackChunkName: "image" */ '~/modules/image/soyuzSvg.js'),
  DataFrame: () => import(/* webpackChunkName: "default" */ '~/modules/soyuz-core/DataFrame.js'),
  Targeter: () => import(/* webpackChunkName: "targeter" */ '~/modules/soyuz-core/Targeter.js'),

  /* Soyuz forms */
  formfile: () => import(/* webpackChunkName: "form" */ '~/modules/soyuz-forms/file'), 
  forminput: () => import(/* webpackChunkName: "form" */ '~/modules/soyuz-forms/input.js'),
  formtextarea: () => import(/* webpackChunkName: "form" */ '~/modules/soyuz-forms/textarea.js'),
  formselectclass: () => import(/* webpackChunkName: "targeter" */ '~/modules/soyuz-forms/select-class.js'),
};
