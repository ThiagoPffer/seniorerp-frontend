appModule.filter('telephone', function(){
    return function(input) {
        var number = input || '';
        number = number.trim().replace(/[-\s\(\)]/g, '');

        switch (number.length) {
            case 10:
                var area = ['(', number.substr(0,2) ,')'].join('');
                var local = [number.substr(2, 4), number.substr(6, 4)].join('-');
                return [area,local].join(' ');
        
            case 11:
                var area = ['(', number.substr(0,2) ,')'].join('');
                var local = [number.substr(2, 5), number.substr(7, 4)].join('-');
                return [area,local].join(' ');

            default:
                break;
        }

        return number;
    };
});