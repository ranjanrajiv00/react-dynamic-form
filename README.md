This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## React Dynamic Form

```
<DynamicForm className="form"
  title="Dynamic From"
  defaultValues={this.state.defaultValues}
  schema={this.state.schema}
  onSubmit={(model) => { this.onSubmit(model) }}>
</DynamicForm>
```
Pass form schema (json structure) as below.
```
{
    "productName": {
        "label": "Product Name",
        "key": "productName",
        "type": "text",
        "props": {
            "required": true,
            "name": "product_name_kk",
            "size": "45",
            "maxLength": 15
        }
    },
    "price": {
        "label": "Price",
        "key": "price",
        "type": "number",
        "props": {
            "required": true,
            "size": "45",
            "name": "product_price",
            "maxLength": 60
        }
    },
    "merchandiserEmail": {
        "label": "Merchandiser Email",
        "key": "merchandiserEmail",
        "type": "email",
        "props": {
            "required": true,
            "size": "45",
            "name": "merchant_email",
            "maxLength": 60,
            "email": "true"
        }
    },
    "availablityStatus": {
        "label": "Availablity Status",
        "key": "availablityStatus",
        "type": "radio",
        "options": [
            {
                "key": "yes",
                "label": "No",
                "name": "status",
                "value": "no"
            },
            {
                "key": "no",
                "label": "Yes",
                "name": "status",
                "value": "yes"
            }
        ],
        "props": {
            "required": true,
            "name": "avail_status"
        }
    },
    "discountDays": {
        "label": "Discount Days",
        "key": "discountDays",
        "type": "checkbox",
        "options": [
            {
                "key": "sunday",
                "label": "Sunday",
                "value": "sunday"
            },
            {
                "key": "monday",
                "label": "Monday",
                "value": "monday"
            },
            {
                "key": "others",
                "label": "Other Days",
                "value": "others"
            }
        ],
        "props": {
            "name": "avail_days"
        }
    },
    "colors": {
        "label": "Colors",
        "key": "colors",
        "type": "select",
        "options": [
            {
                "key": "gray",
                "label": "Gray",
                "value": "#cccccc"
            },
            {
                "key": "white",
                "label": "White",
                "value": "#ffffff"
            },
            {
                "key": "black",
                "label": "Black",
                "value": "#000000"
            }
        ],
        "props": {
            "required": true,
            "name": "colors"
        }
    },
    "availableDate": {
        "label": "Available Date",
        "type": "datetime",
        "key": "availableDate",
        "props": {
            "required": true,
            "name": "available_date"
        },
        "validations": {
            "validateAvailableDate":{
                "args": {
                    "from": "2018/9/6 19:25:48"
                },
                "error": "Fix the selected date"
            }
        }
    },
    "description": {
        "label": "Description",
        "key": "description",
        "type": "textarea",
        "props": {
            "required": true,
            "name": "description",
            "rows": 10,
            "cols": 50,
            "maxLength": 600
        }
    },
    "image": {
        "label": "Image",
        "key": "image",
        "type": "file",
        "props": {
            "name": "image",
            "multiple": true
        },
        "validations": {
            "validateFileType":{
                "args": { 
                    "filetypes": ["png", "jpg", "jpeg"] 
                },
                "error": "File type not supported"
            }
        }
    }    
}
```
