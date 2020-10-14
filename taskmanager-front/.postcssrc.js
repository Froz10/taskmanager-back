module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js'),
    require('postcss-import'),
    require('autoprefixer')({
      autoprefixer:{
        flexbox: 'no-2009'
      },
      stage: 3
    })
  ]
}