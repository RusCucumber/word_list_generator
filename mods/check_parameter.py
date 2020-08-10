#request.get_json()と、jsonのキーを渡すと、結果とjsonのキーに対応した値を返す
def check_parameter(request_parameter, json_keys):
    response = [""] * (len(json_keys) + 1)
    response[0] = "OK"

    for i, key in enumerate(json_keys):
        if i == len(json_keys):
            break

        try:
            response[i + 1] = request_parameter[key]
        except KeyError:
            response[0] = "Json key error"
        except:
            response[0] = "Request error"

    return response

if __name__ == "__main__":
    pass