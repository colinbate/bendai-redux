require "rubygems"
require "sinatra"
require "haml"

set :haml, {:attr_wrapper => '"'}


get '/' do
  @scripts = Array.new
  @scripts << '/js/extra/jquery.gritter.min.js'
  @scripts << '/js/bendai.js'
  haml :index
end

    