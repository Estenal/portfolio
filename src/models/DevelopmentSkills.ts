export type SupportedLanguage =
   | 'javascript' | 'typescript' | 'html' | 'css' | 'sql'
   | 'dotnet' | 'python' | 'java' | 'sql' | 'json' | 'bash';

export interface SkillProgressBar {
   name: string;
   icon: string; //svg icon in public/assets/icons/"name".svg
   percentage: number;
   description: string;
   codeSnippet?: SkillCodePreview; //Danh sách các code snippet minh họa cho kỹ năng, sẽ hiển thị ở phần chi tiết khi mở card
}

export interface SkillCodePreview {
   name: string;
   language: SupportedLanguage;
   code: string; //sử dụng trong markdown code block, pre code sẽ được highlight syntax theo language
   specialty?: string; // Một trường tùy chọn để chỉ ra nếu code snippet này minh họa cho một kỹ năng chuyên môn cụ thể nào đó trong category, sẽ hiển thị ở phần chi tiết khi mở card
   description: string[];
}

export interface SkillCategory {
   name: string; //e.g. "Frontend Development Skills"
   overview: SkillProgressBar; //Tổng quan về kỹ năng trong category này, sẽ hiển thị ở card chính
   overviewDescription: string[]; //Mô tả ngắn gọn về category, sẽ hiển thị ở phần chi tiết khi mở card
   platformProficiency: SkillProgressBar[]; //Danh sách các nền tảng (platform) mà mình có kinh nghiệm, sẽ hiển thị ở phần chi tiết khi mở card
   toolProficiency?: SkillProgressBar[]; //Tool proficiency nếu có
   //tool và platform có code snippet khoản 5-7 dòng minh họa cho kỹ năng đó, sẽ hiển thị ở phần chi tiết khi mở card
   endDescription: string[]; //Mô tả kết thúc cho category, sẽ hiển thị ở phần chi tiết khi mở card
   endCodeSnippet?: SkillCodePreview; //Danh sách các code snippet minh họa cho category này, sẽ hiển thị ở phần chi tiết khi mở card
}

/*
BASED CATEGORY DEVELOPMENT SKILL NAME LIST:
 - BACKEND DEVELOPMENT SKILLS - 55%
    + .NET & C# - 80%
    + Node.js & Express - 50%
    + Python & Django - 15%
    + Java & Spring Boot - 22%
    + Tool: Visual Studio - 90%, Postman - 75%, Git - 30%
 - FRONTEND DEVELOPMENT SKILLS - 75%
    + React - 80%
    + Three.js - 65%
    + Motion Graphics & Animation - 70%
    + HTML/CSS - 98%
    + TypeScript - 30%
    + Tool: Visual Studio Code - 90%, Figma - 80%, Git - 30%
 - DATABASE DEVELOPMENT SKILLS - 75%
    + SQL Server - 80%
    + MySQL - 70%
    + MongoDB - 75%
    + SQLite - 65%
    + Tool: SQL Server Management Studio - 80%, MongoDB Compass - 75%
 - SOFTWARE DEVELOPMENT SKILLS - 80%
    + Windows Forms - 85%

 - APPLICATION DEVELOPMENT SKILLS - 0%
 - MACHINE LEARNING & DATA SCIENCE SKILLS - 0%
  */

export const skillCategories: SkillCategory[] = [
   {
      name: "Backend Development Skills",
      overview: {
         name: "Backend Overview",
         icon: "",
         percentage: 75,
         description: "Tập trung vào việc xây dựng hệ thống máy chủ mạnh mẽ, dễ bảo trì với API RESTful và quản lý logic nghiệp vụ làm cốt lõi."
      },
      overviewDescription: [
         "Kinh nghiệm phát triển hệ thống backend trên nền tảng ASP.NET Core với trọng tâm là API, quản lý dữ liệu và kiến trúc hệ thống.",
         "Ưu tiên khả năng mở rộng, bảo trì và hiệu năng thông qua việc áp dụng các nguyên tắc thiết kế phần mềm và tối ưu cơ sở dữ liệu.",
         "Có khả năng tiếp cận và học hỏi nhanh các công nghệ mới như Node.js, Java Spring Boot và Python Django."
      ],
      platformProficiency: [
         {
            name: "SQL Query",
            icon: "/UI/icons/SQLite.svg",
            percentage: 80,
            description: "Thành thạo viết truy vấn SQL phức tạp, tối ưu hóa hiệu suất và thiết kế schema hiệu quả.",
            codeSnippet: {
               name: "Stored Procedure",
               language: "sql",
               code: `
USE [Che Tên :)]
GO
/****** Object:  StoredProcedure [dbo].[proc_common.getGroupUserFilter]    Script Date: 17/06/2025 8:27:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[proc_common.getGroupUserFilter](
    @s NVARCHAR(4000),
    @totalRow INT OUTPUT
)
AS
BEGIN
	DECLARE @json		NVARCHAR(max)	= '{"result":0,"message":"","data":{}}'
	DECLARE @userId		NVARCHAR(50)	= json_value(@s, '$.userId');
	DECLARE @page		NVARCHAR(10)	= json_value(@s, '$.page');
	DECLARE @pageRow	NVARCHAR(10)	= json_value(@s, '$.pageRow');
	DECLARE @pageRowInt INT				= COALESCE(TRY_CAST(@pageRow AS INT), 10);
	DECLARE @pageInt	INT				= COALESCE(TRY_CAST(@page AS INT), 1);
	if @pageInt = 0		set @pageInt	= 1
	if @pageRowInt = 0	set @pageRowInt	= 10
	DECLARE @startIndex INT = (@pageInt - 1) * @pageRowInt;
	DECLARE @tb TABLE ( num int, id uniqueidentifier );	
	DECLARE @isAd	bit	= iif(exists (SELECT id FROM GroupUsers WHERE userId = @userid and groupid ='821A961C-32D2-ED11-9C7E-ACD564921C1E'),1,0);

	DECLARE @username NVARCHAR(100) = TRIM(ISNULL(JSON_VALUE(@s, '$.username'), ''));
	DECLARE @group NVARCHAR(100) = TRIM(ISNULL(JSON_VALUE(@s, '$.group'), ''));
	DECLARE @fullname NVARCHAR(100) = TRIM(ISNULL(JSON_VALUE(@s, '$.fullname'), ''));


INSERT INTO @tb
SELECT ROW_NUMBER() OVER (ORDER BY u.username DESC) AS num, u.id
FROM Users u
WHERE 
    (@username = '' OR u.username LIKE '%' + @username + '%')
    AND (@fullname = '' OR u.fullname LIKE N'%' + @fullname + '%')
    AND (
        @group = ''
        OR EXISTS (
            SELECT 1
            FROM GroupUsers gu
            JOIN Groups g ON g.id = gu.groupid
            WHERE gu.userid = u.id AND g.name LIKE N'%' + @group + '%'
        )
    )



DECLARE @totalRows INT = (SELECT COUNT(*) FROM @tb);
SET @totalRow = @totalRows;
SET @json = JSON_MODIFY(@json, '$.result', @totalRows);

-- Trả dữ liệu users + groups
SET @json = JSON_MODIFY(@json, '$.data', JSON_QUERY((
    SELECT 
        u.username,
        u.fullname,
        tb.num,
        ISNULL((
            SELECT 
                g.id,
				g.note,
                g.name
            FROM GroupUsers gu
            JOIN Groups g ON g.id = gu.groupid
            WHERE gu.userid = u.id
            FOR JSON PATH
        ), '[]') AS groups
    FROM @tb tb
    JOIN Users u ON tb.id = u.id
    WHERE tb.num > @startIndex AND tb.num <= @startIndex + @pageRowInt
    FOR JSON PATH, INCLUDE_NULL_VALUES
)));

-- Trả kết quả
SELECT @json AS jsonResult;

END;
`,
               specialty: "Database Optimization",
               description: ["Ví dụ về một stored procedure đơn giản để lấy dữ liệu người dùng theo ID."],
            }
         },
         {
            name: ".NET",
            icon: "/UI/icons/.NET Framework.svg",
            percentage: 80,
            description: "Phát triển các ứng dụng enterprise, Web API với kiến trúc rõ ràng.",
            codeSnippet: {
               name: "Basic GET Endpoint",
               language: "dotnet",
               code: `
[HttpPost]
[Authorize]
public async Task < IActionResult > ChangePassword([FromBody] JObject data)
{
  #region Variables
  string userName = EvenriseConvert.StringConvert(data["UserName"] ?? string.Empty);
  string oldPassword = EvenriseConvert.StringConvert(data["OldPassword"] ?? string.Empty);
  string newPassword = EvenriseConvert.StringConvert(data["NewPassword"] ?? string.Empty);
  #endregion
  var user = await _userManager.FindByNameAsync(userName);
  if (user == null)
    return BadRequest(new ResponseApi() { Message = "User not found." });
  var result = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);
  if (!result.Succeeded)
    return BadRequest(new ResponseApi() { Message = result.Errors.ToString() });
  return Ok(new ResponseApi()
  {
    Success = true,
    Message = "Password changed successfully"
  });
} `,
               specialty: "RESTful API",
               description: [
                  "API thay đổi mật khẩu sử dụng ASP.NET Core Identity với cơ chế xác thực và kiểm tra dữ liệu đầu vào."
               ]
            }
         },
         {
            name: "Node.js & Express",
            icon: "/UI/icons/NodeJs.svg",
            percentage: 50,
            description: "Xây dựng các dịch vụ backend nhẹ và nhanh chóng.",
            codeSnippet: {
               name: "Express Route",
               language: "javascript",
               code: "app.get('/api/users', async (req, res) => {\n  try {\n    const users = await User.find();\n    res.status(200).json(users);\n  } catch (error) {\n    res.status(500).json({ error: error.message });\n  }\n});",
               description: ["Route cơ bản xử lý GET request với Express."]
            }
         },
         {
            name: "Python & Django",
            icon: "/UI/icons/Python.svg",
            percentage: 15,
            description: "Làm quen với cú pháp Python và framework Django cơ bản.",
            codeSnippet: {
               name: "",
               language: "python",
               code: "",
               description: [""]
            }
         },
         {
            name: "Java & Spring Boot",
            icon: "/UI/icons/Java.svg",
            percentage: 22,
            description: "Hiểu biết cơ bản về mô hình MVC trong Spring Boot.",
            codeSnippet: {
               name: "",
               language: "java",
               code: "",
               description: [""]
            }
         }
      ],
      toolProficiency: [
         {
            name: "SQL Server",
            icon: "/UI/icons/Microsoft SQL Server.svg",
            percentage: 70,
            description: "Công cụ quản lý cơ sở dữ liệu",
            codeSnippet: {
               name: "ActionMappings Table",
               language: "sql",
               code: `
CREATE TABLE ActionMapping (
    Id INT PRIMARY KEY,                -- Khóa chính
    ActionName NVARCHAR(255) NOT NULL, -- Tên hành động
    StoredProcedure NVARCHAR(255) NOT NULL, -- Tên stored procedure
    DefaultFiltersJson NVARCHAR(MAX) NULL   -- JSON chứa bộ lọc mặc định
);
`,
               description: [""]
            }
         },
         {
            name: "Visual Studio",
            icon: "/UI/icons/Visual Studio.svg",
            percentage: 90,
            description: "IDE chính để phát triển các dự án .NET.",
            codeSnippet: {
               name: "POST API",
               language: "dotnet",
               code: `
[HttpPost]
public async Task < IActionResult > Post([FromBody] JObject requestData)
{
  // Chuyển JObject sang Dictionary
  if (requestData == null)
    return BadRequest(new ResponseApi() { StatusCode = -1, Message = "Invalid request format" });

  var parametersDict = requestData.ToObject<Dictionary<string, object>>();
  if (parametersDict == null)
    return BadRequest(new ResponseApi() { StatusCode = -1, Message = "Invalid request format" });

  // Lấy action
  if (!parametersDict.TryGetValue("action", out var actionObj) || actionObj == null)
  return BadRequest(new ResponseApi() { StatusCode = -1, Message = "Missing action" });

string action = actionObj?.ToString() ?? string.Empty;

  // Lấy tên proc từ bảng ánh xạ
  var procName = await _db.ActionMappings
    .Where(m => m.ActionName == action)
    .Select(m => m.StoredProcedure)
    .FirstOrDefaultAsync();
  if (string.IsNullOrEmpty(procName))
    return BadRequest(new ResponseApi() { StatusCode = -1, Message = $"Unknown action: {action}" });

  ////lấy userid từ claims
  //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
  //parametersDict["userId"] = userId;

  parametersDict.Remove("action"); // Xoá action khỏi tham số

  // Gọi proc động
  var jsonResult = await _db.ExecuteProcAsJsonAsync(parametersDict, procName);
  return Content(jsonResult, "application/json");
}`,
               description: [""]
            }
         },
         {
            name: "Postman",
            icon: "/UI/icons/Postman.svg",
            percentage: 75,
            description: "Sử dụng thường xuyên để kiểm thử và tài liệu hóa API.",
            codeSnippet: {
               name: "API JSON",
               language: "json",
               code: `
{
  "userId": "12345678-ABCD-1234-ABCD-1234567890AB",
  "page": 1,
  "pageRow": 10,
  "username": "tri",
  "fullname": "Đỗ",
  "group": "Admin"
}
`,
               description: [""]
            }
         },
         {
            name: "Git",
            icon: "/UI/icons/GIT.svg",
            percentage: 30,
            description: "Quản lý mã nguồn cơ bản."
         }
      ],
      endDescription: [
         "Mục tiêu tiếp theo là đào sâu hơn vào kiến trúc Microservices và nâng cao kỹ năng Node.js.",
         "Học và tìm hiểu sâu thêm về Machine Leaning và các xu thế công nghệ hiện nay."
      ],
      endCodeSnippet: {
         name: "User Management API",
         language: "dotnet",
         code: `
[HttpPost, Auth] //[HttpPost, Auth] 
public IHttpActionResult UpdateUserInfo(dynamic data)
{
  try {

    if (data == null)
      return BadRequest(new ReponseApi("Dữ liệu truyền vào không hợp lệ"));

    //if data.xx = null -> return ""
    #region variables
    string username = Convert.ToString(data.username);
    string fullname = Convert.ToString(data.fullname);
    string phone = Convert.ToString(data.phone);
    string password = Convert.ToString(data.password);
    string state = Convert.ToString(data.state);
    string note = Convert.ToString(data.note);
    int State;
    #endregion

    #region check var
      username = username?.Trim();
    if (username == "")
      return BadRequest(new ReponseApi("[username] không được bỏ trống"));
    fullname = fullname?.Trim();
    if (fullname == "")
      return BadRequest(new ReponseApi("[fullname] không được bỏ trống"));
    phone = phone?.Trim();
    state = state?.Trim();
    if (state == "")
      state = "0"; //default 
    if (!int.TryParse(state, out State))
      return BadRequest(new ReponseApi("[state] phải là số nguyên"));
    note = note?.Trim();
    #endregion


    if ((data["username"]?.ToString().Contains("@deleted") ?? false))
      return BadRequest(new ReponseApi("Tài khoản đã bị khóa, không thể thay đổi thông tin."));

    User user = db.Users.Where(u => u.username == username).FirstOrDefault();

    if (user == null)
      return BadRequest(new ReponseApi("Không tìm thấy người dùng với tên đăng nhập này."));

    if (!checkAdmin.IsAdmin(CurrentIndentity, db) || user.id == this.CurrentUser().id)
      return BadRequest(new ReponseApi("Quyền truy cập bị từ chối"));

    //update another info
    if (password == null && password.Contains(" ") && password.Length < 5)
      return Json(new ReponseApi("Mật khẩu không hợp lệ."));

    user.password = md5.ComputeMD5Hash(password);
    user.fullname = fullname;
    user.phone = phone;
    user.state = State;
    user.note = note;

    db.SaveChanges();
    return Json(new ReponseApi
    {
      success = true,
      message = "Thay đổi thông tin thành công."
    });
  }
  catch (Exception ex)
  {
    return BadRequest(new ReponseApi(ex.Message) { data = ex });
  }
}`,
         description: ["Admin Auth"]
      }
   },
   {
      name: "Frontend Development Skills",
      overview: {
         name: "Frontend Overview",
         icon: "",
         percentage: 75,
         description: "Xây dựng giao diện người dùng tương tác cao, tập trung vào trải nghiệm mượt mà và thiết kế trực quan."
      },
      overviewDescription: [
         "Thế mạnh lớn nhất ở việc phát triển UI/UX với HTML/CSS và React.",
         "Đam mê tạo ra các hiệu ứng hình ảnh sống động với Three.js và Motion Graphics."
      ],
      platformProficiency: [
         {
            name: "React",
            icon: "/UI/icons/React Native.svg",
            percentage: 80,
            description: "Xây dựng Single Page Applications (SPA) với hooks và quản lý state phức tạp.",
            codeSnippet: {
               name: "React API",
               language: "typescript",
               code:
                  `
export const getCurrentUserApi = async () => {
   const response = await fetch(apiUrl + "/auth/currentuser", {
   method: "GET",
   credentials: "include",
   });
  
   if (response.ok) {
      const data = await response.json();
      return { success: true, data };
   } else {
      return { success: false, message: "Unauthorized" };
   }
  };`,
               description: ["Gọi API lấy user hiện tại"]
            }
         },
         {
            name: "TypeScript",
            icon: "/UI/icons/Typescript.svg",
            percentage: 60,
            description: "Đang tích hợp dần vào các dự án React để tăng tính an toàn kiểu dữ liệu."
         },
         {
            name: "Three.js",
            icon: "/UI/icons/JavaScript.svg",
            percentage: 65,
            description: "Tích hợp đồ họa 3D trực tiếp vào trình duyệt."
         },
         {
            name: "Motion Graphics & Animation",
            icon: "/UI/icons/JavaScript.svg",
            percentage: 70,
            description: "Tạo chuyển động mượt mà cho các thành phần UI."
         },
         {
            name: "HTML/CSS",
            icon: "/UI/icons/HTML.svg",
            percentage: 98,
            description: "Thành thạo cấu trúc ngữ nghĩa và thiết kế responsive.",
            codeSnippet: {
               name: "Flexbox Layout",
               language: "css",
               code: ".container {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem;\n}",
               description: ["Sử dụng Flexbox để dàn trang nhanh chóng."]
            }
         },
         {
            name: "TailwindCSS",
            icon: "/UI/icons/TailwindCSS.svg",
            percentage: 90,
            description: "Đang tích hợp dần vào các dự án React để tăng tính an toàn kiểu dữ liệu."
         },
         {
            name: "Bootstrap",
            icon: "/UI/icons/Bootstrap.svg",
            percentage: 30,
            description: "Đang tích hợp dần vào các dự án React để tăng tính an toàn kiểu dữ liệu."
         }
      ],
      toolProficiency: [
         {
            name: "Visual Studio Code",
            icon: "/UI/icons/VSCode.svg",
            percentage: 80,
            description: "Trình soạn thảo mã chính cho các dự án web.",
            codeSnippet: {
               name: "post",
               language: "typescript",
               code: `

export const post = async (url: string, data: any, token?: string) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': 'Bearer ' + token })
            },
            body: JSON.stringify(data)
        });
        return {
            success: true,
            message: null,
            data: await response.json(),
        };
    } catch (error) {
        console.error('post Lỗi:', error);
        return {
            success: false,
            message: 'post Lỗi: ' + error,
            data: null
        };
    }
};`,
               description: [""]

            }
         },
         {
            name: "Anti Gravity",
            icon: "/UI/icons/Anti Gravity.svg",
            percentage: 60,
            description: "Trình soạn thảo mã chính cho các dự án web."
         },
         {
            name: "Cursor",
            icon: "/UI/icons/Cursor.svg",
            percentage: 60,
            description: "Trình soạn thảo mã chính cho các dự án web."
         },
         {
            name: "Figma",
            icon: "/UI/icons/Figma.svg",
            percentage: 80,
            description: "Sử dụng để xem và trích xuất tài sản từ các bản thiết kế UI/UX."
         },
         {
            name: "Git",
            icon: "/UI/icons/GIT.svg",
            percentage: 30,
            description: "Quản lý phiên bản cơ bản."
         }
      ],
      endDescription: [
         "Luôn cập nhật các xu hướng UI mới nhất và tối ưu hóa hiệu suất hiển thị (Render Performance)."
      ]
   },
   {
      name: "Database Development Skills",
      overview: {
         name: "Database Overview",
         icon: "",
         percentage: 75,
         description: "Thiết kế, truy vấn và quản trị dữ liệu hiệu quả trên cả cơ sở dữ liệu quan hệ và phi quan hệ."
      },
      overviewDescription: [
         "Kinh nghiệm dày dặn nhất với SQL Server trong các dự án doanh nghiệp.",
         "Có khả năng thích ứng linh hoạt giữa SQL và NoSQL tùy theo nhu cầu dự án."
      ],
      platformProficiency: [
         {
            name: "SQL Server",
            icon: "/UI/icons/Microsoft SQL Server.svg",
            percentage: 80,
            description: "Thiết kế schema, viết stored procedures và tối ưu hóa query.",
            codeSnippet: {
               name: "Basic JOIN Query",
               language: "sql",
               code: "SELECT u.UserName, p.ProfileImage\nFROM Users u\nINNER JOIN Profiles p ON u.Id = p.UserId\nWHERE u.IsActive = 1;",
               description: ["Truy vấn kết hợp bảng cơ bản trong T-SQL."]
            }
         },
         {
            name: "MySQL",
            icon: "/UI/icons/MySQL.svg",
            percentage: 70,
            description: "Quản trị và thao tác dữ liệu cho các ứng dụng web thông dụng."
         },
         {
            name: "MongoDB",
            icon: "/UI/icons/MongoDB.svg",
            percentage: 75,
            description: "Thiết kế document models cho dữ liệu phi cấu trúc."
         },
         {
            name: "SQLite",
            icon: "/UI/icons/SQLite.svg",
            percentage: 65,
            description: "Lưu trữ dữ liệu cục bộ cho các ứng dụng nhỏ hoặc mobile."
         }
      ],
      toolProficiency: [
         {
            name: "SQL Server Management Studio",
            icon: "/UI/icons/Microsoft SQL Server.svg",
            percentage: 80,
            description: "Công cụ quản trị CSDL chính."
         },
         {
            name: "MongoDB Compass",
            icon: "/UI/icons/MongoDB.svg",
            percentage: 75,
            description: "Công cụ GUI để thao tác với MongoDB."
         }
      ],
      endDescription: [
         "Mong muốn tìm hiểu sâu hơn về database indexing và xử lý luồng dữ liệu lớn (Big Data)."
      ]
   },
   {
      name: "Software Development Skills",
      overview: {
         name: "Software Overview",
         icon: "",
         percentage: 80,
         description: "Phát triển phần mềm ứng dụng desktop trực tiếp cho môi trường Windows."
      },
      overviewDescription: [
         "Sở hữu kiến thức chuyên sâu về việc xây dựng ứng dụng Desktop truyền thống."
      ],
      platformProficiency: [
         {
            name: "Windows Forms",
            icon: "/UI/icons/C#.svg",
            percentage: 85,
            description: "Phát triển ứng dụng quản lý, tool nội bộ trên nền tảng Windows.",
            codeSnippet: {
               name: "Button Click Event",
               language: "dotnet",
               code: "private void btnSubmit_Click(object sender, EventArgs e)\n{\n    MessageBox.Show(\"Dữ liệu đã được lưu thành công!\", \"Thông báo\", MessageBoxButtons.OK);\n}",
               description: ["Xử lý sự kiện click trên giao diện WinForms."]
            }
         }
      ],
      endDescription: [
         "Kinh nghiệm WinForms giúp nắm chắc nền tảng lập trình hướng sự kiện (Event-driven programming)."
      ]
   }
];