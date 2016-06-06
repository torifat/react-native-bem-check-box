Pod::Spec.new do |s|
  s.name             = "react-native-bem-check-box"
  s.version          = "1.0.0"
  s.summary          = "React Native bridge for BEMCheckBox"
  s.homepage         = "https://github.com/torifat/react-native-bem-check-box"
  s.license          = "MIT"
  s.author           = { "Rifat Nabi" => "to.rifat@gmail.com" }
  s.source           = { :git => "https://github.com/torifat/react-native-bem-check-box.git", :tag => s.version }

  s.platform         = :ios, "7.0"
  s.requires_arc     = true

  s.source_files     = "RNBEMCheckBox/*.{h,m}", "BEMCheckBox/*.{h,m}"

  s.dependency "React"
end
