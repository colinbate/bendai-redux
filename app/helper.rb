require "rubygems"
require "sinatra"

class Helper
  @@session_name = "bendai-user-session"
  def self.user_session(req)
    sid = req.cookies[@@session_name]
    sid ||= false
    return sid
  end
  
  def self.set_user_session(sid, res)
    res.set_cookie(@@session_name, {:value => sid, :path => '/game/'})
  end
end