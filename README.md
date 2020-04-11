# ip2region
ip在线转换工具

# 特点
- 快速，准确，可靠
- 易于集成，提供JSON结构
- 可以用于商业用途，无需授权
- 开源免费，可二次开发，直接查看源码

# 使用
请求格式:GET http://smallsite.online:8085/lookUp?ip=yourIP  
返回结构(模拟数据):
```javascript
{
  success:true/false,
  msg:'解析成功/解析失败',
  data:{
	ip:"0.0.1",
	country:"中国",
	province:"四川",
	city:"成都",
	isp:"电信",
  }
} 
```
