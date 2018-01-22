/**
 * Created by josemanuel on 8/22/16.
 */
module latte {

    /**
     *
     */
    export class LinearIcon extends IconItem {

        //region Static

        static catalog = {
            home:"600",
            home2:"601",
            home3:"602",
            home4:"603",
            home5:"604",
            home6:"605",
            bathtub:"606",
            toothbrush:"607",
            bed:"608",
            couch:"609",
            chair:"60a",
            city:"60b",
            apartment:"60c",
            pencil:"60d",
            pencil2:"60e",
            pen:"60f",
            pencil3:"610",
            eraser:"611",
            pencil4:"612",
            pencil5:"613",
            feather:"614",
            feather2:"615",
            feather3:"616",
            pen2:"617",
            pen_add:"618",
            pen_remove:"619",
            vector:"61a",
            pen3:"61b",
            blog:"61c",
            brush:"61d",
            brush2:"61e",
            spray:"61f",
            paint_roller:"620",
            stamp:"621",
            tape:"622",
            desk_tape:"623",
            texture:"624",
            eye_dropper:"625",
            palette:"626",
            color_sampler:"627",
            bucket:"628",
            gradient:"629",
            gradient2:"62a",
            magic_wand:"62b",
            magnet:"62c",
            pencil_ruler:"62d",
            pencil_ruler2:"62e",
            compass:"62f",
            aim:"630",
            gun:"631",
            bottle:"632",
            drop:"633",
            drop_crossed:"634",
            drop2:"635",
            snow:"636",
            snow2:"637",
            fire:"638",
            lighter:"639",
            knife:"63a",
            dagger:"63b",
            tissue:"63c",
            toilet_paper:"63d",
            poop:"63e",
            umbrella:"63f",
            umbrella2:"640",
            rain:"641",
            tornado:"642",
            wind:"643",
            fan:"644",
            contrast:"645",
            sun_small:"646",
            sun:"647",
            sun2:"648",
            moon:"649",
            cloud:"64a",
            cloud_upload:"64b",
            cloud_download:"64c",
            cloud_rain:"64d",
            cloud_hailstones:"64e",
            cloud_snow:"64f",
            cloud_windy:"650",
            sun_wind:"651",
            cloud_fog:"652",
            cloud_sun:"653",
            cloud_lightning:"654",
            cloud_sync:"655",
            cloud_lock:"656",
            cloud_gear:"657",
            cloud_alert:"658",
            cloud_check:"659",
            cloud_cross:"65a",
            cloud_crossed:"65b",
            cloud_database:"65c",
            database:"65d",
            database_add:"65e",
            database_remove:"65f",
            database_lock:"660",
            database_refresh:"661",
            database_check:"662",
            database_history:"663",
            database_upload:"664",
            database_download:"665",
            server:"666",
            shield:"667",
            shield_check:"668",
            shield_alert:"669",
            shield_cross:"66a",
            lock:"66b",
            rotation_lock:"66c",
            unlock:"66d",
            key:"66e",
            key_hole:"66f",
            toggle_off:"670",
            toggle_on:"671",
            cog:"672",
            cog2:"673",
            wrench:"674",
            screwdriver:"675",
            hammer_wrench:"676",
            hammer:"677",
            saw:"678",
            axe:"679",
            axe2:"67a",
            shovel:"67b",
            pickaxe:"67c",
            factory:"67d",
            factory2:"67e",
            recycle:"67f",
            trash:"680",
            trash2:"681",
            trash3:"682",
            broom:"683",
            game:"684",
            gamepad:"685",
            joystick:"686",
            dice:"687",
            spades:"688",
            diamonds:"689",
            clubs:"68a",
            hearts:"68b",
            heart:"68c",
            star:"68d",
            star_half:"68e",
            star_empty:"68f",
            flag:"690",
            flag2:"691",
            flag3:"692",
            mailbox_full:"693",
            mailbox_empty:"694",
            at_sign:"695",
            envelope:"696",
            envelope_open:"697",
            paperclip:"698",
            paper_plane:"699",
            reply:"69a",
            reply_all:"69b",
            inbox:"69c",
            inbox2:"69d",
            outbox:"69e",
            box:"69f",
            archive:"6a0",
            archive2:"6a1",
            drawers:"6a2",
            drawers2:"6a3",
            drawers3:"6a4",
            eye:"6a5",
            eye_crossed:"6a6",
            eye_plus:"6a7",
            eye_minus:"6a8",
            binoculars:"6a9",
            binoculars2:"6aa",
            hdd:"6ab",
            hdd_down:"6ac",
            hdd_up:"6ad",
            floppy_disk:"6ae",
            disc:"6af",
            tape2:"6b0",
            printer:"6b1",
            shredder:"6b2",
            file_empty:"6b3",
            file_add:"6b4",
            file_check:"6b5",
            file_lock:"6b6",
            files:"6b7",
            copy:"6b8",
            compare:"6b9",
            folder:"6ba",
            folder_search:"6bb",
            folder_plus:"6bc",
            folder_minus:"6bd",
            folder_download:"6be",
            folder_upload:"6bf",
            folder_star:"6c0",
            folder_heart:"6c1",
            folder_user:"6c2",
            folder_shared:"6c3",
            folder_music:"6c4",
            folder_picture:"6c5",
            folder_film:"6c6",
            scissors:"6c7",
            paste:"6c8",
            clipboard_empty:"6c9",
            clipboard_pencil:"6ca",
            clipboard_text:"6cb",
            clipboard_check:"6cc",
            clipboard_down:"6cd",
            clipboard_left:"6ce",
            clipboard_alert:"6cf",
            clipboard_user:"6d0",
            register:"6d1",
            enter:"6d2",
            exit:"6d3",
            papers:"6d4",
            news:"6d5",
            reading:"6d6",
            typewriter:"6d7",
            document:"6d8",
            document2:"6d9",
            graduation_hat:"6da",
            license:"6db",
            license2:"6dc",
            medal_empty:"6dd",
            medal_first:"6de",
            medal_second:"6df",
            medal_third:"6e0",
            podium:"6e1",
            trophy:"6e2",
            trophy2:"6e3",
            music_note:"6e4",
            music_note2:"6e5",
            music_note3:"6e6",
            playlist:"6e7",
            playlist_add:"6e8",
            guitar:"6e9",
            trumpet:"6ea",
            album:"6eb",
            shuffle:"6ec",
            repeat_one:"6ed",
            repeat:"6ee",
            headphones:"6ef",
            headset:"6f0",
            loudspeaker:"6f1",
            equalizer:"6f2",
            theater:"6f3",
            _3d_glasses:"6f4",
            ticket:"6f5",
            presentation:"6f6",
            play:"6f7",
            film_play:"6f8",
            clapboard_play:"6f9",
            media:"6fa",
            film:"6fb",
            film2:"6fc",
            surveillance:"6fd",
            surveillance2:"6fe",
            camera:"6ff",
            camera_crossed:"700",
            camera_play:"701",
            time_lapse:"702",
            record:"703",
            camera2:"704",
            camera_flip:"705",
            panorama:"706",
            time_lapse2:"707",
            shutter:"708",
            shutter2:"709",
            face_detection:"70a",
            flare:"70b",
            convex:"70c",
            concave:"70d",
            picture:"70e",
            picture2:"70f",
            picture3:"710",
            pictures:"711",
            book:"712",
            audio_book:"713",
            book2:"714",
            bookmark:"715",
            bookmark2:"716",
            label:"717",
            library:"718",
            library2:"719",
            contacts:"71a",
            profile:"71b",
            portrait:"71c",
            portrait2:"71d",
            user:"71e",
            user_plus:"71f",
            user_minus:"720",
            user_lock:"721",
            users:"722",
            users2:"723",
            users_plus:"724",
            users_minus:"725",
            group_work:"726",
            woman:"727",
            man:"728",
            baby:"729",
            baby2:"72a",
            baby3:"72b",
            baby_bottle:"72c",
            walk:"72d",
            hand_waving:"72e",
            jump:"72f",
            run:"730",
            woman2:"731",
            man2:"732",
            man_woman:"733",
            height:"734",
            weight:"735",
            scale:"736",
            button:"737",
            bow_tie:"738",
            tie:"739",
            socks:"73a",
            shoe:"73b",
            shoes:"73c",
            hat:"73d",
            pants:"73e",
            shorts:"73f",
            flip_flops:"740",
            shirt:"741",
            hanger:"742",
            laundry:"743",
            store:"744",
            haircut:"745",
            store_24:"746",
            barcode:"747",
            barcode2:"748",
            barcode3:"749",
            cashier:"74a",
            bag:"74b",
            bag2:"74c",
            cart:"74d",
            cart_empty:"74e",
            cart_full:"74f",
            cart_plus:"750",
            cart_plus2:"751",
            cart_add:"752",
            cart_remove:"753",
            cart_exchange:"754",
            tag:"755",
            tags:"756",
            receipt:"757",
            wallet:"758",
            credit_card:"759",
            cash_dollar:"75a",
            cash_euro:"75b",
            cash_pound:"75c",
            cash_yen:"75d",
            bag_dollar:"75e",
            bag_euro:"75f",
            bag_pound:"760",
            bag_yen:"761",
            coin_dollar:"762",
            coin_euro:"763",
            coin_pound:"764",
            coin_yen:"765",
            calculator:"766",
            calculator2:"767",
            abacus:"768",
            vault:"769",
            telephone:"76a",
            phone_lock:"76b",
            phone_wave:"76c",
            phone_pause:"76d",
            phone_outgoing:"76e",
            phone_incoming:"76f",
            phone_in_out:"770",
            phone_error:"771",
            phone_sip:"772",
            phone_plus:"773",
            phone_minus:"774",
            voicemail:"775",
            dial:"776",
            telephone2:"777",
            pushpin:"778",
            pushpin2:"779",
            map_marker:"77a",
            map_marker_user:"77b",
            map_marker_down:"77c",
            map_marker_check:"77d",
            map_marker_crossed:"77e",
            radar:"77f",
            compass2:"780",
            map:"781",
            map2:"782",
            location:"783",
            road_sign:"784",
            calendar_empty:"785",
            calendar_check:"786",
            calendar_cross:"787",
            calendar_31:"788",
            calendar_full:"789",
            calendar_insert:"78a",
            calendar_text:"78b",
            calendar_user:"78c",
            mouse:"78d",
            mouse_left:"78e",
            mouse_right:"78f",
            mouse_both:"790",
            keyboard:"791",
            keyboard_up:"792",
            keyboard_down:"793",
            _delete:"794",
            spell_check:"795",
            escape:"796",
            enter2:"797",
            screen:"798",
            aspect_ratio:"799",
            signal:"79a",
            signal_lock:"79b",
            signal_80:"79c",
            signal_60:"79d",
            signal_40:"79e",
            signal_20:"79f",
            signal_0:"7a0",
            signal_blocked:"7a1",
            sim:"7a2",
            flash_memory:"7a3",
            usb_drive:"7a4",
            phone:"7a5",
            smartphone:"7a6",
            smartphone_notification:"7a7",
            smartphone_vibration:"7a8",
            smartphone_embed:"7a9",
            smartphone_waves:"7aa",
            tablet:"7ab",
            tablet2:"7ac",
            laptop:"7ad",
            laptop_phone:"7ae",
            desktop:"7af",
            launch:"7b0",
            new_tab:"7b1",
            window:"7b2",
            cable:"7b3",
            cable2:"7b4",
            tv:"7b5",
            radio:"7b6",
            remote_control:"7b7",
            power_switch:"7b8",
            power:"7b9",
            power_crossed:"7ba",
            flash_auto:"7bb",
            lamp:"7bc",
            flashlight:"7bd",
            lampshade:"7be",
            cord:"7bf",
            outlet:"7c0",
            battery_power:"7c1",
            battery_empty:"7c2",
            battery_alert:"7c3",
            battery_error:"7c4",
            battery_low1:"7c5",
            battery_low2:"7c6",
            battery_low3:"7c7",
            battery_mid1:"7c8",
            battery_mid2:"7c9",
            battery_mid3:"7ca",
            battery_full:"7cb",
            battery_charging:"7cc",
            battery_charging2:"7cd",
            battery_charging3:"7ce",
            battery_charging4:"7cf",
            battery_charging5:"7d0",
            battery_charging6:"7d1",
            battery_charging7:"7d2",
            chip:"7d3",
            chip_x64:"7d4",
            chip_x86:"7d5",
            bubble:"7d6",
            bubbles:"7d7",
            bubble_dots:"7d8",
            bubble_alert:"7d9",
            bubble_question:"7da",
            bubble_text:"7db",
            bubble_pencil:"7dc",
            bubble_picture:"7dd",
            bubble_video:"7de",
            bubble_user:"7df",
            bubble_quote:"7e0",
            bubble_heart:"7e1",
            bubble_emoticon:"7e2",
            bubble_attachment:"7e3",
            phone_bubble:"7e4",
            quote_open:"7e5",
            quote_close:"7e6",
            dna:"7e7",
            heart_pulse:"7e8",
            pulse:"7e9",
            syringe:"7ea",
            pills:"7eb",
            first_aid:"7ec",
            lifebuoy:"7ed",
            bandage:"7ee",
            bandages:"7ef",
            thermometer:"7f0",
            microscope:"7f1",
            brain:"7f2",
            beaker:"7f3",
            skull:"7f4",
            bone:"7f5",
            construction:"7f6",
            construction_cone:"7f7",
            pie_chart:"7f8",
            pie_chart2:"7f9",
            graph:"7fa",
            chart_growth:"7fb",
            chart_bars:"7fc",
            chart_settings:"7fd",
            cake:"7fe",
            gift:"7ff",
            balloon:"800",
            rank:"801",
            rank2:"802",
            rank3:"803",
            crown:"804",
            lotus:"805",
            diamond:"806",
            diamond2:"807",
            diamond3:"808",
            diamond4:"809",
            linearicons:"80a",
            teacup:"80b",
            teapot:"80c",
            glass:"80d",
            bottle2:"80e",
            glass_cocktail:"80f",
            glass2:"810",
            dinner:"811",
            dinner2:"812",
            chef:"813",
            scale2:"814",
            egg:"815",
            egg2:"816",
            eggs:"817",
            platter:"818",
            steak:"819",
            hamburger:"81a",
            hotdog:"81b",
            pizza:"81c",
            sausage:"81d",
            chicken:"81e",
            fish:"81f",
            carrot:"820",
            cheese:"821",
            bread:"822",
            ice_cream:"823",
            ice_cream2:"824",
            candy:"825",
            lollipop:"826",
            coffee_bean:"827",
            coffee_cup:"828",
            cherry:"829",
            grapes:"82a",
            citrus:"82b",
            apple:"82c",
            leaf:"82d",
            landscape:"82e",
            pine_tree:"82f",
            tree:"830",
            cactus:"831",
            paw:"832",
            footprint:"833",
            speed_slow:"834",
            speed_medium:"835",
            speed_fast:"836",
            rocket:"837",
            hammer2:"838",
            balance:"839",
            briefcase:"83a",
            luggage_weight:"83b",
            dolly:"83c",
            plane:"83d",
            plane_crossed:"83e",
            helicopter:"83f",
            traffic_lights:"840",
            siren:"841",
            road:"842",
            engine:"843",
            oil_pressure:"844",
            coolant_temperature:"845",
            car_battery:"846",
            gas:"847",
            gallon:"848",
            transmission:"849",
            car:"84a",
            car_wash:"84b",
            car_wash2:"84c",
            bus:"84d",
            bus2:"84e",
            car2:"84f",
            parking:"850",
            car_lock:"851",
            taxi:"852",
            car_siren:"853",
            car_wash3:"854",
            car_wash4:"855",
            ambulance:"856",
            truck:"857",
            trailer:"858",
            scale_truck:"859",
            train:"85a",
            ship:"85b",
            ship2:"85c",
            anchor:"85d",
            boat:"85e",
            bicycle:"85f",
            bicycle2:"860",
            dumbbell:"861",
            bench_press:"862",
            swim:"863",
            football:"864",
            baseball_bat:"865",
            baseball:"866",
            tennis:"867",
            tennis2:"868",
            ping_pong:"869",
            hockey:"86a",
            _8ball:"86b",
            bowling:"86c",
            bowling_pins:"86d",
            golf:"86e",
            golf2:"86f",
            archery:"870",
            slingshot:"871",
            soccer:"872",
            basketball:"873",
            cube:"874",
            _3d_rotate:"875",
            puzzle:"876",
            glasses:"877",
            glasses2:"878",
            accessibility:"879",
            wheelchair:"87a",
            wall:"87b",
            fence:"87c",
            wall2:"87d",
            icons:"87e",
            resize_handle:"87f",
            icons2:"880",
            select:"881",
            select2:"882",
            site_map:"883",
            earth:"884",
            earth_lock:"885",
            network:"886",
            network_lock:"887",
            planet:"888",
            happy:"889",
            smile:"88a",
            grin:"88b",
            tongue:"88c",
            sad:"88d",
            wink:"88e",
            dream:"88f",
            shocked:"890",
            shocked2:"891",
            tongue2:"892",
            neutral:"893",
            happy_grin:"894",
            cool:"895",
            mad:"896",
            grin_evil:"897",
            evil:"898",
            wow:"899",
            annoyed:"89a",
            wondering:"89b",
            confused:"89c",
            zipped:"89d",
            grumpy:"89e",
            mustache:"89f",
            tombstone_hipster:"8a0",
            tombstone:"8a1",
            ghost:"8a2",
            ghost_hipster:"8a3",
            halloween:"8a4",
            christmas:"8a5",
            easter_egg:"8a6",
            mustache2:"8a7",
            mustache_glasses:"8a8",
            pipe:"8a9",
            alarm:"8aa",
            alarm_add:"8ab",
            alarm_snooze:"8ac",
            alarm_ringing:"8ad",
            bullhorn:"8ae",
            hearing:"8af",
            volume_high:"8b0",
            volume_medium:"8b1",
            volume_low:"8b2",
            volume:"8b3",
            mute:"8b4",
            lan:"8b5",
            lan2:"8b6",
            wifi:"8b7",
            wifi_lock:"8b8",
            wifi_blocked:"8b9",
            wifi_mid:"8ba",
            wifi_low:"8bb",
            wifi_low2:"8bc",
            wifi_alert:"8bd",
            wifi_alert_mid:"8be",
            wifi_alert_low:"8bf",
            wifi_alert_low2:"8c0",
            stream:"8c1",
            stream_check:"8c2",
            stream_error:"8c3",
            stream_alert:"8c4",
            communication:"8c5",
            communication_crossed:"8c6",
            broadcast:"8c7",
            antenna:"8c8",
            satellite:"8c9",
            satellite2:"8ca",
            mic:"8cb",
            mic_mute:"8cc",
            mic2:"8cd",
            spotlights:"8ce",
            hourglass:"8cf",
            loading:"8d0",
            loading2:"8d1",
            loading3:"8d2",
            refresh:"8d3",
            refresh2:"8d4",
            undo:"8d5",
            redo:"8d6",
            jump2:"8d7",
            undo2:"8d8",
            redo2:"8d9",
            sync:"8da",
            repeat_one2:"8db",
            sync_crossed:"8dc",
            sync2:"8dd",
            repeat_one3:"8de",
            sync_crossed2:"8df",
            return:"8e0",
            return2:"8e1",
            refund:"8e2",
            history:"8e3",
            history2:"8e4",
            self_timer:"8e5",
            clock:"8e6",
            clock2:"8e7",
            clock3:"8e8",
            watch:"8e9",
            alarm2:"8ea",
            alarm_add2:"8eb",
            alarm_remove:"8ec",
            alarm_check:"8ed",
            alarm_error:"8ee",
            timer:"8ef",
            timer_crossed:"8f0",
            timer2:"8f1",
            timer_crossed2:"8f2",
            download:"8f3",
            upload:"8f4",
            download2:"8f5",
            upload2:"8f6",
            enter_up:"8f7",
            enter_down:"8f8",
            enter_left:"8f9",
            enter_right:"8fa",
            exit_up:"8fb",
            exit_down:"8fc",
            exit_left:"8fd",
            exit_right:"8fe",
            enter_up2:"8ff",
            enter_down2:"900",
            enter_vertical:"901",
            enter_left2:"902",
            enter_right2:"903",
            enter_horizontal:"904",
            exit_up2:"905",
            exit_down2:"906",
            exit_left2:"907",
            exit_right2:"908",
            cli:"909",
            bug:"90a",
            code:"90b",
            file_code:"90c",
            file_image:"90d",
            file_zip:"90e",
            file_audio:"90f",
            file_video:"910",
            file_preview:"911",
            file_charts:"912",
            file_stats:"913",
            file_spreadsheet:"914",
            link:"915",
            unlink:"916",
            link2:"917",
            unlink2:"918",
            thumbs_up:"919",
            thumbs_down:"91a",
            thumbs_up2:"91b",
            thumbs_down2:"91c",
            thumbs_up3:"91d",
            thumbs_down3:"91e",
            share:"91f",
            share2:"920",
            share3:"921",
            magnifier:"922",
            file_search:"923",
            find_replace:"924",
            zoom_in:"925",
            zoom_out:"926",
            loupe:"927",
            loupe_zoom_in:"928",
            loupe_zoom_out:"929",
            cross:"92a",
            menu:"92b",
            list:"92c",
            list2:"92d",
            list3:"92e",
            menu2:"92f",
            list4:"930",
            menu3:"931",
            exclamation:"932",
            question:"933",
            check:"934",
            cross2:"935",
            plus:"936",
            minus:"937",
            percent:"938",
            chevron_up:"939",
            chevron_down:"93a",
            chevron_left:"93b",
            chevron_right:"93c",
            chevrons_expand_vertical:"93d",
            chevrons_expand_horizontal:"93e",
            chevrons_contract_vertical:"93f",
            chevrons_contract_horizontal:"940",
            arrow_up:"941",
            arrow_down:"942",
            arrow_left:"943",
            arrow_right:"944",
            arrow_up_right:"945",
            arrows_merge:"946",
            arrows_split:"947",
            arrow_divert:"948",
            arrow_return:"949",
            expand:"94a",
            contract:"94b",
            expand2:"94c",
            contract2:"94d",
            move:"94e",
            tab:"94f",
            arrow_wave:"950",
            expand3:"951",
            expand4:"952",
            contract3:"953",
            notification:"954",
            warning:"955",
            notification_circle:"956",
            question_circle:"957",
            menu_circle:"958",
            checkmark_circle:"959",
            cross_circle:"95a",
            plus_circle:"95b",
            circle_minus:"95c",
            percent_circle:"95d",
            arrow_up_circle:"95e",
            arrow_down_circle:"95f",
            arrow_left_circle:"960",
            arrow_right_circle:"961",
            chevron_up_circle:"962",
            chevron_down_circle:"963",
            chevron_left_circle:"964",
            chevron_right_circle:"965",
            backward_circle:"966",
            first_circle:"967",
            previous_circle:"968",
            stop_circle:"969",
            play_circle:"96a",
            pause_circle:"96b",
            next_circle:"96c",
            last_circle:"96d",
            forward_circle:"96e",
            eject_circle:"96f",
            crop:"970",
            frame_expand:"971",
            frame_contract:"972",
            focus:"973",
            transform:"974",
            grid:"975",
            grid_crossed:"976",
            layers:"977",
            layers_crossed:"978",
            toggle:"979",
            rulers:"97a",
            ruler:"97b",
            funnel:"97c",
            flip_horizontal:"97d",
            flip_vertical:"97e",
            flip_horizontal2:"97f",
            flip_vertical2:"980",
            angle:"981",
            angle2:"982",
            subtract:"983",
            combine:"984",
            intersect:"985",
            exclude:"986",
            align_center_vertical:"987",
            align_right:"988",
            align_bottom:"989",
            align_left:"98a",
            align_center_horizontal:"98b",
            align_top:"98c",
            square:"98d",
            plus_square:"98e",
            minus_square:"98f",
            percent_square:"990",
            arrow_up_square:"991",
            arrow_down_square:"992",
            arrow_left_square:"993",
            arrow_right_square:"994",
            chevron_up_square:"995",
            chevron_down_square:"996",
            chevron_left_square:"997",
            chevron_right_square:"998",
            check_square:"999",
            cross_square:"99a",
            menu_square:"99b",
            prohibited:"99c",
            circle:"99d",
            radio_button:"99e",
            ligature:"99f",
            text_format:"9a0",
            text_format_remove:"9a1",
            text_size:"9a2",
            bold:"9a3",
            italic:"9a4",
            underline:"9a5",
            strikethrough:"9a6",
            highlight:"9a7",
            text_align_left:"9a8",
            text_align_center:"9a9",
            text_align_right:"9aa",
            text_align_justify:"9ab",
            line_spacing:"9ac",
            indent_increase:"9ad",
            indent_decrease:"9ae",
            text_wrap:"9af",
            pilcrow:"9b0",
            direction_ltr:"9b1",
            direction_rtl:"9b2",
            page_break:"9b3",
            page_break2:"9b4",
            sort_alpha_asc:"9b5",
            sort_alpha_desc:"9b6",
            sort_numeric_asc:"9b7",
            sort_numeric_desc:"9b8",
            sort_amount_asc:"9b9",
            sort_amount_desc:"9ba",
            sort_time_asc:"9bb",
            sort_time_desc:"9bc",
            sigma:"9bd",
            pencil_line:"9be",
            hand:"9bf",
            pointer_up:"9c0",
            pointer_right:"9c1",
            pointer_down:"9c2",
            pointer_left:"9c3",
            finger_tap:"9c4",
            fingers_tap:"9c5",
            reminder:"9c6",
            fingers_crossed:"9c7",
            fingers_victory:"9c8",
            gesture_zoom:"9c9",
            gesture_pinch:"9ca",
            fingers_scroll_horizontal:"9cb",
            fingers_scroll_vertical:"9cc",
            fingers_scroll_left:"9cd",
            fingers_scroll_right:"9ce",
            hand2:"9cf",
            pointer_up2:"9d0",
            pointer_right2:"9d1",
            pointer_down2:"9d2",
            pointer_left2:"9d3",
            finger_tap2:"9d4",
            fingers_tap2:"9d5",
            reminder2:"9d6",
            gesture_zoom2:"9d7",
            gesture_pinch2:"9d8",
            fingers_scroll_horizontal2:"9d9",
            fingers_scroll_vertical2:"9da",
            fingers_scroll_left2:"9db",
            fingers_scroll_right2:"9dc",
            fingers_scroll_vertical3:"9dd",
            border_style:"9de",
            border_all:"9df",
            border_outer:"9e0",
            border_inner:"9e1",
            border_top:"9e2",
            border_horizontal:"9e3",
            border_bottom:"9e4",
            border_left:"9e5",
            border_vertical:"9e6",
            border_right:"9e7",
            border_none:"9e8",
            ellipsis:"9e9"
        };

        //region Icons
        static get home(): LinearIcon { return LinearIcon.byCatalog("home"); }
        static get apartment(): LinearIcon { return LinearIcon.byCatalog("apartment"); }
        static get pencil(): LinearIcon { return LinearIcon.byCatalog("pencil"); }
        static get magic_wand(): LinearIcon { return LinearIcon.byCatalog("magic-wand"); }
        static get drop(): LinearIcon { return LinearIcon.byCatalog("drop"); }
        static get lighter(): LinearIcon { return LinearIcon.byCatalog("lighter"); }
        static get poop(): LinearIcon { return LinearIcon.byCatalog("poop"); }
        static get sun(): LinearIcon { return LinearIcon.byCatalog("sun"); }
        static get moon(): LinearIcon { return LinearIcon.byCatalog("moon"); }
        static get cloud(): LinearIcon { return LinearIcon.byCatalog("cloud"); }
        static get cloud_upload(): LinearIcon { return LinearIcon.byCatalog("cloud-upload"); }
        static get cloud_download(): LinearIcon { return LinearIcon.byCatalog("cloud-download"); }
        static get cloud_sync(): LinearIcon { return LinearIcon.byCatalog("cloud-sync"); }
        static get cloud_check(): LinearIcon { return LinearIcon.byCatalog("cloud-check"); }
        static get database(): LinearIcon { return LinearIcon.byCatalog("database"); }
        static get lock(): LinearIcon { return LinearIcon.byCatalog("lock"); }
        static get cog(): LinearIcon { return LinearIcon.byCatalog("cog"); }
        static get trash(): LinearIcon { return LinearIcon.byCatalog("trash"); }
        static get dice(): LinearIcon { return LinearIcon.byCatalog("dice"); }
        static get heart(): LinearIcon { return LinearIcon.byCatalog("heart"); }
        static get star(): LinearIcon { return LinearIcon.byCatalog("star"); }
        static get star_half(): LinearIcon { return LinearIcon.byCatalog("star-half"); }
        static get star_empty(): LinearIcon { return LinearIcon.byCatalog("star-empty"); }
        static get flag(): LinearIcon { return LinearIcon.byCatalog("flag"); }
        static get envelope(): LinearIcon { return LinearIcon.byCatalog("envelope"); }
        static get paperclip(): LinearIcon { return LinearIcon.byCatalog("paperclip"); }
        static get inbox(): LinearIcon { return LinearIcon.byCatalog("inbox"); }
        static get eye(): LinearIcon { return LinearIcon.byCatalog("eye"); }
        static get printer(): LinearIcon { return LinearIcon.byCatalog("printer"); }
        static get file_empty(): LinearIcon { return LinearIcon.byCatalog("file-empty"); }
        static get file_add(): LinearIcon { return LinearIcon.byCatalog("file-add"); }
        static get enter(): LinearIcon { return LinearIcon.byCatalog("enter"); }
        static get exit(): LinearIcon { return LinearIcon.byCatalog("exit"); }
        static get graduation_hat(): LinearIcon { return LinearIcon.byCatalog("graduation-hat"); }
        static get license(): LinearIcon { return LinearIcon.byCatalog("license"); }
        static get music_note(): LinearIcon { return LinearIcon.byCatalog("music-note"); }
        static get film_play(): LinearIcon { return LinearIcon.byCatalog("film-play"); }
        static get camera_video(): LinearIcon { return LinearIcon.byCatalog("camera-video"); }
        static get camera(): LinearIcon { return LinearIcon.byCatalog("camera"); }
        static get picture(): LinearIcon { return LinearIcon.byCatalog("picture"); }
        static get book(): LinearIcon { return LinearIcon.byCatalog("book"); }
        static get bookmark(): LinearIcon { return LinearIcon.byCatalog("bookmark"); }
        static get user(): LinearIcon { return LinearIcon.byCatalog("user"); }
        static get users(): LinearIcon { return LinearIcon.byCatalog("users"); }
        static get shirt(): LinearIcon { return LinearIcon.byCatalog("shirt"); }
        static get store(): LinearIcon { return LinearIcon.byCatalog("store"); }
        static get cart(): LinearIcon { return LinearIcon.byCatalog("cart"); }
        static get tag(): LinearIcon { return LinearIcon.byCatalog("tag"); }
        static get phone_handset(): LinearIcon { return LinearIcon.byCatalog("phone-handset"); }
        static get phone(): LinearIcon { return LinearIcon.byCatalog("phone"); }
        static get pushpin(): LinearIcon { return LinearIcon.byCatalog("pushpin"); }
        static get map_marker(): LinearIcon { return LinearIcon.byCatalog("map-marker"); }
        static get map(): LinearIcon { return LinearIcon.byCatalog("map"); }
        static get location(): LinearIcon { return LinearIcon.byCatalog("location"); }
        static get calendar_full(): LinearIcon { return LinearIcon.byCatalog("calendar-full"); }
        static get keyboard(): LinearIcon { return LinearIcon.byCatalog("keyboard"); }
        static get spell_check(): LinearIcon { return LinearIcon.byCatalog("spell-check"); }
        static get screen(): LinearIcon { return LinearIcon.byCatalog("screen"); }
        static get smartphone(): LinearIcon { return LinearIcon.byCatalog("smartphone"); }
        static get tablet(): LinearIcon { return LinearIcon.byCatalog("tablet"); }
        static get laptop(): LinearIcon { return LinearIcon.byCatalog("laptop"); }
        static get laptop_phone(): LinearIcon { return LinearIcon.byCatalog("laptop-phone"); }
        static get power_switch(): LinearIcon { return LinearIcon.byCatalog("power-switch"); }
        static get bubble(): LinearIcon { return LinearIcon.byCatalog("bubble"); }
        static get heart_pulse(): LinearIcon { return LinearIcon.byCatalog("heart-pulse"); }
        static get construction(): LinearIcon { return LinearIcon.byCatalog("construction"); }
        static get pie_chart(): LinearIcon { return LinearIcon.byCatalog("pie-chart"); }
        static get chart_bars(): LinearIcon { return LinearIcon.byCatalog("chart-bars"); }
        static get gift(): LinearIcon { return LinearIcon.byCatalog("gift"); }
        static get diamond(): LinearIcon { return LinearIcon.byCatalog("diamond"); }
        static get linearicons(): LinearIcon { return LinearIcon.byCatalog("linearicons"); }
        static get dinner(): LinearIcon { return LinearIcon.byCatalog("dinner"); }
        static get coffee_cup(): LinearIcon { return LinearIcon.byCatalog("coffee-cup"); }
        static get leaf(): LinearIcon { return LinearIcon.byCatalog("leaf"); }
        static get paw(): LinearIcon { return LinearIcon.byCatalog("paw"); }
        static get rocket(): LinearIcon { return LinearIcon.byCatalog("rocket"); }
        static get briefcase(): LinearIcon { return LinearIcon.byCatalog("briefcase"); }
        static get bus(): LinearIcon { return LinearIcon.byCatalog("bus"); }
        static get car(): LinearIcon { return LinearIcon.byCatalog("car"); }
        static get train(): LinearIcon { return LinearIcon.byCatalog("train"); }
        static get bicycle(): LinearIcon { return LinearIcon.byCatalog("bicycle"); }
        static get wheelchair(): LinearIcon { return LinearIcon.byCatalog("wheelchair"); }
        static get select(): LinearIcon { return LinearIcon.byCatalog("select"); }
        static get earth(): LinearIcon { return LinearIcon.byCatalog("earth"); }
        static get smile(): LinearIcon { return LinearIcon.byCatalog("smile"); }
        static get sad(): LinearIcon { return LinearIcon.byCatalog("sad"); }
        static get neutral(): LinearIcon { return LinearIcon.byCatalog("neutral"); }
        static get mustache(): LinearIcon { return LinearIcon.byCatalog("mustache"); }
        static get alarm(): LinearIcon { return LinearIcon.byCatalog("alarm"); }
        static get bullhorn(): LinearIcon { return LinearIcon.byCatalog("bullhorn"); }
        static get volume_high(): LinearIcon { return LinearIcon.byCatalog("volume-high"); }
        static get volume_medium(): LinearIcon { return LinearIcon.byCatalog("volume-medium"); }
        static get volume_low(): LinearIcon { return LinearIcon.byCatalog("volume-low"); }
        static get volume(): LinearIcon { return LinearIcon.byCatalog("volume"); }
        static get mic(): LinearIcon { return LinearIcon.byCatalog("mic"); }
        static get hourglass(): LinearIcon { return LinearIcon.byCatalog("hourglass"); }
        static get undo(): LinearIcon { return LinearIcon.byCatalog("undo"); }
        static get redo(): LinearIcon { return LinearIcon.byCatalog("redo"); }
        static get sync(): LinearIcon { return LinearIcon.byCatalog("sync"); }
        static get history(): LinearIcon { return LinearIcon.byCatalog("history"); }
        static get clock(): LinearIcon { return LinearIcon.byCatalog("clock"); }
        static get download(): LinearIcon { return LinearIcon.byCatalog("download"); }
        static get upload(): LinearIcon { return LinearIcon.byCatalog("upload"); }
        static get enter_down(): LinearIcon { return LinearIcon.byCatalog("enter-down"); }
        static get exit_up(): LinearIcon { return LinearIcon.byCatalog("exit-up"); }
        static get bug(): LinearIcon { return LinearIcon.byCatalog("bug"); }
        static get code(): LinearIcon { return LinearIcon.byCatalog("code"); }
        static get link(): LinearIcon { return LinearIcon.byCatalog("link"); }
        static get unlink(): LinearIcon { return LinearIcon.byCatalog("unlink"); }
        static get thumbs_up(): LinearIcon { return LinearIcon.byCatalog("thumbs-up"); }
        static get thumbs_down(): LinearIcon { return LinearIcon.byCatalog("thumbs-down"); }
        static get magnifier(): LinearIcon { return LinearIcon.byCatalog("magnifier"); }
        static get cross(): LinearIcon { return LinearIcon.byCatalog("cross"); }
        static get menu(): LinearIcon { return LinearIcon.byCatalog("menu"); }
        static get list(): LinearIcon { return LinearIcon.byCatalog("list"); }
        static get chevron_up(): LinearIcon { return LinearIcon.byCatalog("chevron-up"); }
        static get chevron_down(): LinearIcon { return LinearIcon.byCatalog("chevron-down"); }
        static get chevron_left(): LinearIcon { return LinearIcon.byCatalog("chevron-left"); }
        static get chevron_right(): LinearIcon { return LinearIcon.byCatalog("chevron-right"); }
        static get arrow_up(): LinearIcon { return LinearIcon.byCatalog("arrow-up"); }
        static get arrow_down(): LinearIcon { return LinearIcon.byCatalog("arrow-down"); }
        static get arrow_left(): LinearIcon { return LinearIcon.byCatalog("arrow-left"); }
        static get arrow_right(): LinearIcon { return LinearIcon.byCatalog("arrow-right"); }
        static get move(): LinearIcon { return LinearIcon.byCatalog("move"); }
        static get warning(): LinearIcon { return LinearIcon.byCatalog("warning"); }
        static get question_circle(): LinearIcon { return LinearIcon.byCatalog("question-circle"); }
        static get menu_circle(): LinearIcon { return LinearIcon.byCatalog("menu-circle"); }
        static get checkmark_circle(): LinearIcon { return LinearIcon.byCatalog("checkmark-circle"); }
        static get cross_circle(): LinearIcon { return LinearIcon.byCatalog("cross-circle"); }
        static get plus_circle(): LinearIcon { return LinearIcon.byCatalog("plus-circle"); }
        static get circle_minus(): LinearIcon { return LinearIcon.byCatalog("circle-minus"); }
        static get arrow_up_circle(): LinearIcon { return LinearIcon.byCatalog("arrow-up-circle"); }
        static get arrow_down_circle(): LinearIcon { return LinearIcon.byCatalog("arrow-down-circle"); }
        static get arrow_left_circle(): LinearIcon { return LinearIcon.byCatalog("arrow-left-circle"); }
        static get arrow_right_circle(): LinearIcon { return LinearIcon.byCatalog("arrow-right-circle"); }
        static get chevron_up_circle(): LinearIcon { return LinearIcon.byCatalog("chevron-up-circle"); }
        static get chevron_down_circle(): LinearIcon { return LinearIcon.byCatalog("chevron-down-circle "); }
        static get chevron_left_circle(): LinearIcon { return LinearIcon.byCatalog("chevron-left-circle "); }
        static get chevron_right_circle (): LinearIcon { return LinearIcon.byCatalog("chevron-right-circle"); }
        static get crop(): LinearIcon { return LinearIcon.byCatalog("crop"); }
        static get frame_expand(): LinearIcon { return LinearIcon.byCatalog("frame-expand"); }
        static get frame_contract(): LinearIcon { return LinearIcon.byCatalog("frame-contract"); }
        static get layers(): LinearIcon { return LinearIcon.byCatalog("layers"); }
        static get funnel(): LinearIcon { return LinearIcon.byCatalog("funnel"); }
        static get text_format(): LinearIcon { return LinearIcon.byCatalog("text-format"); }
        static get text_format_remove(): LinearIcon { return LinearIcon.byCatalog("text-format-remove"); }
        static get text_size(): LinearIcon { return LinearIcon.byCatalog("text-size"); }
        static get bold(): LinearIcon { return LinearIcon.byCatalog("bold"); }
        static get italic(): LinearIcon { return LinearIcon.byCatalog("italic"); }
        static get underline(): LinearIcon { return LinearIcon.byCatalog("underline"); }
        static get strikethrough(): LinearIcon { return LinearIcon.byCatalog("strikethrough"); }
        static get highlight(): LinearIcon { return LinearIcon.byCatalog("highlight"); }
        static get text_align_left(): LinearIcon { return LinearIcon.byCatalog("text-align-left"); }
        static get text_align_center(): LinearIcon { return LinearIcon.byCatalog("text-align-center"); }
        static get text_align_right(): LinearIcon { return LinearIcon.byCatalog("text-align-right"); }
        static get text_align_justify(): LinearIcon { return LinearIcon.byCatalog("text-align-justify"); }
        static get line_spacing(): LinearIcon { return LinearIcon.byCatalog("line-spacing"); }
        static get indent_increase(): LinearIcon { return LinearIcon.byCatalog("indent-increase"); }
        static get indent_decrease(): LinearIcon { return LinearIcon.byCatalog("indent-decrease"); }
        static get pilcrow(): LinearIcon { return LinearIcon.byCatalog("pilcrow"); }
        static get direction_ltr(): LinearIcon { return LinearIcon.byCatalog("direction-ltr"); }
        static get direction_rtl(): LinearIcon { return LinearIcon.byCatalog("direction-rtl"); }
        static get page_break(): LinearIcon { return LinearIcon.byCatalog("page-break"); }
        static get sort_alpha_asc(): LinearIcon { return LinearIcon.byCatalog("sort-alpha-asc"); }
        static get sort_amount_asc(): LinearIcon { return LinearIcon.byCatalog("sort-amount-asc"); }
        static get hand(): LinearIcon { return LinearIcon.byCatalog("hand"); }
        static get pointer_up(): LinearIcon { return LinearIcon.byCatalog("pointer-up"); }
        static get pointer_right(): LinearIcon { return LinearIcon.byCatalog("pointer-right"); }
        static get pointer_down(): LinearIcon { return LinearIcon.byCatalog("pointer-down"); }
        static get pointer_left(): LinearIcon { return LinearIcon.byCatalog("pointer-left"); }
        //endregion

        /**
         * Gets the icon by name
         * @param name
         * @returns {latte.LinearIcon}
         */
        static byCatalog_standby(name: string): LinearIcon{
            let item = new LinearIcon();
            let code = parseInt(name in LinearIcon.catalog ? LinearIcon.catalog[name] : LinearIcon.catalog['question'], 16);
            log(name)
            log(LinearIcon.catalog[name])
            log(code)
            item.raw.innerHTML = String.fromCharCode(code);// sprintf("&#%s;", code);
            item.linearIconName = name;
            return item;
        }
        /**
         * Gets the icon by name
         * @param name
         * @returns {latte.LinearIcon}
         */
        static byCatalog(name: string): LinearIcon{
            let item = new LinearIcon();
            item.addClass('icon-' + name);
            item.linearIconName = name;
            return item;
        }
        /**
         * Gets the icon by name
         * @param name
         * @returns {latte.LinearIcon}
         */
        static byStyleName(name: string): LinearIcon{
            let item = new LinearIcon();
            item.addClass('lnr-' + name);
            item.linearIconName = name;
            return item;
        }
        //endregion

        //region Fields
        //endregion

        /**
         *
         */
        constructor() {
            super();
            this.addClass('lnr');
            this.url = null;
        }

        //region Private Methods
        //endregion

        //region Methods

        /**
         * Returns a clone of the icon
         **/
        clone(): IconItem{

            let icon = super.clone();

            icon.addClass('lnr');
            icon.addClass('lnr' + this.linearIconName);

            return icon;

        }

        /**
         * Sets the color and returns the icon for chaining
         * @param color
         * @returns {latte.LinearIcon}
         */
        colorize(color: Color): LinearIcon{
            this.element.css('color', color.toString());
            return this;
        }

        /**
         * Sets the size to 32 and returns the icon for chaining
         * @returns {latte.LinearIcon}
         */
        go32(): LinearIcon{
            this.size = 32;
            return this;
        }

        /**
         *
         * @returns {latte.LinearIcon}
         */
        goSmall(): LinearIcon{
            this.raw.style.fontSize = '10px';
            this.raw.style.marginTop = '-3px';
            return this;
        }

        //endregion

        //region Events
        //endregion

        //region Properties

        /**
         * Property field
         */
        private _linearIconName: string = null;

        /**
         * Gets or sets the linear icon name
         *
         * @returns {string}
         */
        get linearIconName(): string {
            return this._linearIconName;
        }

        /**
         * Gets or sets the linear icon name
         *
         * @param {string} value
         */
        set linearIconName(value: string) {
            this._linearIconName = value;
        }

        //endregion

    }

}