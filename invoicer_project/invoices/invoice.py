from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import letter


def create_pdf(serializer, items):
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    pdfmetrics.registerFont(TTFont('TimesNewRoman', 'static/fonts/Roboto-Regular.ttf'))
    p.setFont('TimesNewRoman', 20)
    default_retreat_x = 40
    p.drawString(default_retreat_x, 740,
                 f"{serializer.data['name']} від {serializer.data['date_of_invoice'].split('-')[2]}.{serializer.data['date_of_invoice'].split('-')[1]}.{serializer.data['date_of_invoice'].split('-')[0]}р.")
    p.line(default_retreat_x, 730, 565, 730)
    p.setFont('TimesNewRoman', 13)
    p.drawString(default_retreat_x, 710,
                 f"Постачальник:  {serializer.data['user_first_name']} {serializer.data['user_last_name']}")
    p.drawString(default_retreat_x, 690,
                 f"Покупець:  {serializer.data['client_first_name']} {serializer.data['client_last_name']}")
    p.drawString(default_retreat_x, 670,
                 f"Договір:  Договір поставки")
    table_headers = ['№', 'Назва товару', 'К-сть', 'Од.', 'Ціна', 'Сума']
    table_header_x = 40
    table_header_y = 650
    table_row_x = table_header_x
    table_row_y = table_header_y - 30

    id_width = 30
    name_width = 300
    amount_width = 50
    unit_width = 40
    price_width = 45
    sum_width = 60

    row_height = 20
    row_height_header = 38
    text_position_height = 5
    text_position_height_header = 14
    text_position_width = 2

    pdfmetrics.registerFont(TTFont('TimesNewRomanBold', 'static/fonts/Roboto-Black.ttf'))
    for i, data in enumerate(items.data):
        item_id = str(i + 1)
        name = data['item_name']
        price = str(data['price'])
        amount = str(data['amount'])
        unit = str(data['unit'])
        sum_price = str(data["price"] * data["amount"])

        if i == 0:
            p.rect(table_row_x, table_row_y, id_width, row_height_header)
            p.rect(table_row_x + id_width, table_row_y, name_width, row_height_header)
            p.rect(table_row_x + id_width + name_width, table_row_y, amount_width, row_height_header)
            p.rect(table_row_x + id_width + name_width + amount_width, table_row_y, unit_width, row_height_header)
            p.rect(table_row_x + id_width + name_width + amount_width + unit_width, table_row_y, price_width,
                   row_height_header)
            p.rect(table_row_x + id_width + name_width + amount_width + unit_width + price_width, table_row_y,
                   sum_width, row_height_header)
            p.setFont('TimesNewRomanBold', 12)
            p.drawString(table_row_x + text_position_width, table_row_y + text_position_height_header, table_headers[0])
            p.drawString(table_row_x + id_width + text_position_width, table_row_y + text_position_height_header,
                         table_headers[1])
            p.drawString(table_row_x + id_width + name_width + text_position_width, table_row_y + text_position_height_header,
                         table_headers[2])
            p.drawString(table_row_x + id_width + name_width + amount_width + text_position_width,
                         table_row_y + text_position_height_header, table_headers[3])
            p.drawString(table_row_x + id_width + name_width + amount_width + unit_width + text_position_width,
                         table_row_y + text_position_height_header,
                         table_headers[4])
            p.drawString(
                table_row_x + id_width + name_width + amount_width + unit_width + price_width + text_position_width,
                table_row_y + text_position_height_header,
                table_headers[5])
            table_row_y -= row_height
        p.setFont('TimesNewRoman', 11)
        p.rect(table_row_x, table_row_y, id_width, row_height)
        p.rect(table_row_x + id_width, table_row_y, name_width, row_height)
        p.rect(table_row_x + id_width + name_width, table_row_y, amount_width, row_height)
        p.rect(table_row_x + id_width + name_width + amount_width, table_row_y, unit_width, row_height)
        p.rect(table_row_x + id_width + name_width + amount_width + unit_width, table_row_y, price_width, row_height)
        p.rect(table_row_x + id_width + name_width + amount_width + unit_width + price_width, table_row_y,
               sum_width, row_height)

        p.drawString(table_row_x + text_position_width, table_row_y + text_position_height, item_id)
        p.drawString(table_row_x + id_width + text_position_width, table_row_y + text_position_height, name)
        p.drawString(table_row_x + id_width + name_width + text_position_width, table_row_y + text_position_height,
                     amount)
        p.drawString(table_row_x + id_width + name_width + amount_width + text_position_width,
                     table_row_y + text_position_height, unit)
        p.drawString(table_row_x + id_width + name_width + amount_width + unit_width + text_position_width,
                     table_row_y + text_position_height, price)
        p.drawString(
            table_row_x + id_width + name_width + amount_width + unit_width + price_width + text_position_width,
            table_row_y + text_position_height, sum_price)
        table_row_y -= row_height

    p.setFont('TimesNewRoman', 14)
    p.drawString(375, table_row_y - 20, f"Всього: {serializer.data['price']} {serializer.data['currency']}")
    p.line(default_retreat_x, table_row_y - 50, 565, table_row_y - 50)
    place_of_text_sign_height = 93
    p.drawString(default_retreat_x, table_row_y - place_of_text_sign_height, f"Від постачальника")
    place_of_second_column_width = 310
    p.drawString(place_of_second_column_width, table_row_y - place_of_text_sign_height, f"Отримав(ла)")
    place_of_lines_height = 125
    p.line(default_retreat_x, table_row_y - place_of_lines_height, 280, table_row_y - place_of_lines_height)
    p.line(place_of_second_column_width, table_row_y - place_of_lines_height, 565, table_row_y - place_of_lines_height)

    p.showPage()
    p.save()
    buffer.seek(0)

    return buffer.getvalue()
