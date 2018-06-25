/**
 * Created by Administrator on 2018/6/25.
 */


/*
 * 1. 进行表单校验配置
 *    校验要求:
 *        (1) 用户名不能为空, 长度为2-6位
 *        (2) 密码不能为空, 长度为6-12位
 * */
$(function () {
  $("#form").bootstrapValidator({


    //1. 指定校验时的图标显示
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //2. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6位'
          },
          callback:{
            message:"用户名不存在"
          }

        }
      },
      password:{
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '用户名长度必须在6到12位'
          },
          callback:{
            message:"密码错误"
          }

        }
      }
    }

  });


  /*
   * 2. 使用 submit 按钮, 进行提交, 表单校验插件, 会在提交时, 进行校验,
   *    (1) 如果校验成功, 会默认提交这次请求, 会进行跳转, 我们需要阻止这次提交, 通过 ajax 提交
   *    (2) 如果校验失败, 会提示用户, 输入有误
   *
   *    需要注册表单校验成功事件, 在成功事件内, 阻止默认的表单提交, 通过 ajax 进行提交
   * */

  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    console.log("阻止了默认事件,进行ajax请求");
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $("#form").serialize(),
      dataType: "json",
      success: function (info) {
        console.log(info);

          if(info.success){
            location.href('index.html')
          }
          if(info.error===1000){
            $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback")
          }
          if(info.error===1001){
            // 将 password 的校验状态, 置成 校验失败状态, 并提示 密码错误
            // updateStatus的参数
            // 1. 字段名
            // 2. 校验状态, VALID 校验成功  INVALID 校验失败  NOT_VALIDATED 未校验
            // 3. 配置提示信息, 需要传校验规则
            $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback")
          }


      }
    })
  })


//3.表单重置

  $('[type=reset]').click(function(){
    $('#form').data('bootstrapValidator').resetForm()
  })



})