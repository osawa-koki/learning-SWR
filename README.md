# learning-SWR

## イロイロ説明

### kaminari

ページネーションを実装するためのRubyライブラリです。  
<https://github.com/kaminari/kaminari>  

```shell
bundle add kaminari
```

`kaminari_config.rb`に以下のように記述します。  

```ruby
Kaminari.configure do |config|
  config.default_per_page = 5
end
```
